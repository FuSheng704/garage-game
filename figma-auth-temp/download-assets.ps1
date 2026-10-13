# 在项目根目录执行：powershell -ExecutionPolicy Bypass -File .\download-assets.ps1
# Figma MCP 原始资源链接有效期约 7 天，请收到后尽快执行。
$ErrorActionPreference = 'Stop'
$target = Join-Path $PSScriptRoot 'public\figma-auth'
New-Item -ItemType Directory -Force -Path $target | Out-Null

$assets = @(
  @{Name='register-close.svg'; Url='https://www.figma.com/api/mcp/asset/2fdea859-dcf4-4d2f-b966-db96adadf832.svg'},
  @{Name='register-flower.png'; Url='https://www.figma.com/api/mcp/asset/9963e757-0cbd-4c3e-99b6-ed8de70d5836.png'},
  @{Name='register-top-left.png'; Url='https://www.figma.com/api/mcp/asset/b3352595-4e0e-41b4-86c7-31a761d1fcd4.png'},
  @{Name='register-bottom-right.png'; Url='https://www.figma.com/api/mcp/asset/d5c1d350-62a5-48ab-9cfd-0e89ee101150.png'},
  @{Name='register-bottom-left.png'; Url='https://www.figma.com/api/mcp/asset/611adb7e-de52-4542-a5cc-551391036925.png'},
  @{Name='register-right-small.png'; Url='https://www.figma.com/api/mcp/asset/f82d4d2e-7c42-4fd7-917f-0f7b281129d2.png'},
  @{Name='register-paper.svg'; Url='https://www.figma.com/api/mcp/asset/0f9d6260-211c-4e61-b15a-239ffa4ec5ff.svg'},
  @{Name='register-left-arc.svg'; Url='https://www.figma.com/api/mcp/asset/9de11ba5-1dfa-491f-b1c2-ceeb4cb5fa7e.svg'},
  @{Name='register-star1.svg'; Url='https://www.figma.com/api/mcp/asset/73a57e17-b28e-45ab-8a96-1231eb0b3669.svg'},
  @{Name='register-star2.svg'; Url='https://www.figma.com/api/mcp/asset/09bc027a-236a-4f88-af80-ed2928240939.svg'},
  @{Name='register-star3.svg'; Url='https://www.figma.com/api/mcp/asset/c3706018-cdc8-4a66-a81b-ded9146d45e5.svg'},
  @{Name='register-user.svg'; Url='https://www.figma.com/api/mcp/asset/4978900f-d168-445b-ad16-8342db8f6b6d.svg'},
  @{Name='register-phone.svg'; Url='https://www.figma.com/api/mcp/asset/579d0869-9cf8-4489-9acc-11472b6b4e14.svg'},
  @{Name='register-email.svg'; Url='https://www.figma.com/api/mcp/asset/485bcffe-2ff9-4f30-ad08-b28143cce7b9.svg'},
  @{Name='register-lock.svg'; Url='https://www.figma.com/api/mcp/asset/9667f26e-6e1d-43fc-85fb-14adb79c9f04.svg'},
  @{Name='register-eye.svg'; Url='https://www.figma.com/api/mcp/asset/4ab69d5b-612a-40d1-9a48-1c7c0a0726d7.svg'},
  @{Name='register-button-shine.svg'; Url='https://www.figma.com/api/mcp/asset/e4dd756f-3845-40e4-bcf0-f245e3eea863.svg'},
  @{Name='register-arrow.svg'; Url='https://www.figma.com/api/mcp/asset/746f636d-2763-4a06-8326-a9ab838ca942.svg'},
  @{Name='login-close.svg'; Url='https://www.figma.com/api/mcp/asset/52d8c3a3-6a29-42ee-9d41-2d265152c9ba.svg'},
  @{Name='login-top-left.png'; Url='https://www.figma.com/api/mcp/asset/1740a521-2443-4c28-bf96-64fba2464ff6.png'},
  @{Name='login-bottom-right.png'; Url='https://www.figma.com/api/mcp/asset/4273f73b-cb03-45a4-9b4c-a4b25ec9d3c6.png'},
  @{Name='login-flower.png'; Url='https://www.figma.com/api/mcp/asset/533a4749-a67e-4d4d-a62a-848e3888504e.png'},
  @{Name='login-bottom-left.png'; Url='https://www.figma.com/api/mcp/asset/9a9286c8-2370-4337-afc3-6f5eb8630209.png'},
  @{Name='login-right-small.png'; Url='https://www.figma.com/api/mcp/asset/1d50dd82-0e08-4fa3-83de-5ee67e4a8298.png'},
  @{Name='login-paper.svg'; Url='https://www.figma.com/api/mcp/asset/30571818-6668-4415-a2b1-cab6212de7a5.svg'},
  @{Name='login-left-arc.svg'; Url='https://www.figma.com/api/mcp/asset/582ac665-0c4f-4550-b72c-ffae13e50379.svg'},
  @{Name='login-stars.svg'; Url='https://www.figma.com/api/mcp/asset/abf64378-f0f3-48bb-af86-8f3605cd38de.svg'},
  @{Name='login-user.svg'; Url='https://www.figma.com/api/mcp/asset/5af98ea9-c073-4373-9509-703a0251cec6.svg'},
  @{Name='login-lock.svg'; Url='https://www.figma.com/api/mcp/asset/759adaab-6725-4e83-93cb-1c5393c9e72b.svg'},
  @{Name='login-eye.svg'; Url='https://www.figma.com/api/mcp/asset/708f2d77-98cd-48ea-af05-75c582e1ba04.svg'},
  @{Name='login-button-shine.svg'; Url='https://www.figma.com/api/mcp/asset/46a84731-268f-4b7c-b4f4-2a44ec1b15ed.svg'},
  @{Name='login-arrow.svg'; Url='https://www.figma.com/api/mcp/asset/e73a7bfb-8bf6-4f25-9735-b80d0fd5606a.svg'}
)

$failed = @()
foreach ($a in $assets) {
  $output = Join-Path $target $a.Name
  try {
    Write-Host "Downloading $($a.Name)..."
    Invoke-WebRequest -Uri $a.Url -OutFile $output -UseBasicParsing -ErrorAction Stop
    if (!(Test-Path $output) -or (Get-Item $output).Length -eq 0) {
      throw 'Downloaded file is empty'
    }
  } catch {
    Write-Warning "Failed: $($a.Name) -- $_"
    $failed += $a.Name
  }
}

if ($failed.Count -gt 0) {
  Write-Host "Some assets failed: $($failed -join ', ')" -ForegroundColor Red
  Write-Host 'Figma asset URLs expire. Refresh the URLs from the Figma design if necessary.'
  exit 1
}
Write-Host "All $($assets.Count) original Figma assets downloaded into public/figma-auth" -ForegroundColor Green
