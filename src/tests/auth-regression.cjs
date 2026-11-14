const fs = require('fs');
const vm = require('vm');
const esbuild = require('esbuild');
const assert = require('node:assert/strict');
function load(file, context = {}) {
 let source = fs.readFileSync(file, 'utf8').replace('import.meta.env.VITE_API_BASE_URL', '"https://api.test"');
 const code = esbuild.transformSync(source, {loader:'ts',format:'cjs',target:'es2022'}).code;
 const exports = {};
 const module = {exports};
 vm.runInNewContext(code, {exports, module, require:()=>({}), URL, Headers, Response, Event, ...context});
 return module.exports;
}
const nav = load('auth/navigation.ts');
for (const bad of [null,'https://evil.test','//evil.test','/login','/login#x','/a/../login','/%00','/%0a','/%5cevil','/%2flogin','/%6cogin','/%zz']) assert.equal(nav.getSafeRedirect(bad), '/home', String(bad));
for (const good of ['/wish?year=2026#photos','/wish?q=100%25','/wish?q=%2Ffoo']) assert.equal(nav.getSafeRedirect(good), good);
const target = '/wish?q=%2Ffoo#photos';
assert.equal(nav.getSafeRedirect(new URLSearchParams(nav.buildLoginPath({pathname:'/wish', search:'?q=%2Ffoo',hash:'#photos'}).split('?')[1]).get('redirect')),target);
function storage() { const data = new Map(); return {getItem:k=>data.get(k)??null,setItem:(k,v)=>data.set(k,v),removeItem:k=>data.delete(k)}; }
(async()=>{
 let events = 0, reply;
 const client = load('api/client.ts', {localStorage:storage(),sessionStorage:storage(),window:{dispatchEvent:()=>events++},fetch:async()=>{ if(typeof reply==='function') return reply(); return reply; }});
 client.setAuthToken('old'); reply = new Response('<html>unauthorized</html>', {status:401});
 await assert.rejects(client.apiRequest('/user/info',{responseType:'json'}),e=>e.status===401);
 assert.equal(client.hasAuthToken(),false); assert.equal(events,1);
 client.setAuthToken('old'); reply=()=>{client.setAuthToken('new'); return new Response('bad',{status:401});};
 await assert.rejects(client.apiRequest('/user/info',{responseType:'json'}));
 assert.equal(client.getAccessToken(),'new'); assert.equal(events,1);
 reply=new Response('{}',{status:403}); await assert.rejects(client.apiRequest('/private')); assert.equal(client.getAccessToken(),'new');
 reply=new Response('Internal Server Error',{status:500});
 await assert.rejects(client.apiRequest('/login',{auth:false,responseType:'json'}),e=>e.status===500 && e.message.includes('500') && !e.message.includes('格式'));
 let userReply;
 const auth = load('api/auth.ts', {require:()=>({apiRequest:async()=>userReply})});
 userReply={code:200,data:{user_id:13,uid:'test-admin',nickname:'admin',is_admin:true,birthday:null}};
 assert.equal((await auth.getCurrentUserApi()).is_admin,true);
 userReply={code:200,data:{uid:'test-user',is_admin:false,profile_finished:true}};
 assert.equal((await auth.getCurrentUserApi()).profile_finished,true);
 userReply={data:{is_admin:'true'}};
 await assert.rejects(auth.getCurrentUserApi());
 console.log('PASS: redirect validation, encoding roundtrip, malformed 401 cleanup, stale 401 isolation, 403 retention');
})().catch(e=>{console.error(e);process.exitCode=1;});

