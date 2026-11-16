import { useRef, useState } from 'react';
import { FiDownload, FiImage, FiX } from 'react-icons/fi';

export default function RightsGallery({ urls }: { urls: string[] }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [preview, setPreview] = useState<number | null>(null);
  const [failed, setFailed] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const [downloading, setDownloading] = useState(false);

  async function download(index: number) {
    setDownloading(true);
    setMessage('');
    try {
      const response = await fetch(urls[index], { credentials: 'omit' });
      const blob = await response.blob();
      if (!response.ok || !blob.type.startsWith('image/')) throw new Error();
      const objectUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      const extension = blob.type.split('/')[1].split('+')[0].replace('jpeg', 'jpg');
      link.href = objectUrl;
      link.download = `维权图片-${index + 1}.${extension}`;
      document.body.append(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(objectUrl), 30_000);
    } catch {
      setMessage('无法直接下载，请打开原图后保存。');
    } finally {
      setDownloading(false);
    }
  }

  if (!urls.length) return null;
  function image(index: number, lazy = false) {
    const url = urls[index];
    return failed.includes(url)
      ? <span className="pit-image-fallback"><FiImage aria-hidden="true" />图片加载失败</span>
      : <img src={url} loading={lazy ? 'lazy' : undefined} alt={`相关图片 ${index + 1}`}
          onError={() => setFailed(previous => [...previous, url])} />;
  }

  function open(index: number) {
    setPreview(index);
    setMessage('');
    dialog.current?.showModal();
  }

  return <section className="pit-gallery" aria-label="相关图片">
    <div className="pit-detail-block-heading">
      <span className="pit-detail-glyph"><FiImage aria-hidden="true" /></span>
      <span className="pit-detail-block-cn">相关图片</span>
      <span className="pit-detail-block-en">IMAGES</span>
      <button type="button" aria-label="选择要下载的图片" title="选择要下载的图片" onClick={() => open(0)}><FiDownload aria-hidden="true" /></button>
    </div>
    <div className="pit-gallery-grid">
      {urls.map((url, index) => <button type="button" key={url} aria-label={`预览图片 ${index + 1}`} onClick={() => open(index)}>
        {image(index, true)}
      </button>)}
    </div>
    <dialog className="pit-image-dialog" ref={dialog} aria-label="相关图片预览" onClose={() => setPreview(null)}>
      {preview !== null && <div className="pit-image-view">
        <div className="pit-image-actions">
          <select aria-label="选择图片" value={preview} onChange={event => { setPreview(Number(event.target.value)); setMessage(''); }}>
            {urls.map((url, index) => <option key={url} value={index}>图片 {index + 1} / {urls.length}</option>)}
          </select>
          <button type="button" disabled={downloading} onClick={() => void download(preview)}><FiDownload aria-hidden="true" /> 下载</button>
          <button type="button" onClick={() => dialog.current?.close()}><FiX aria-hidden="true" /> 关闭</button>
        </div>
        <div className="pit-image-frame">{image(preview)}</div>
        {message && <p role="status">{message} <a href={urls[preview]} target="_blank" rel="noreferrer">打开原图</a></p>}
      </div>}
    </dialog>
  </section>;
}
