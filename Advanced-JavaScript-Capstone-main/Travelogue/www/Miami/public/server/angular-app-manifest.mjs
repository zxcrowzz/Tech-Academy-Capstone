
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "redirectTo": "/Miami/Miami",
    "route": "/Miami"
  },
  {
    "renderMode": 2,
    "route": "/Miami/Miami"
  },
  {
    "renderMode": 2,
    "route": "/Miami/attractions"
  },
  {
    "renderMode": 2,
    "redirectTo": "/Miami/Miami",
    "route": "/Miami/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 4949, hash: '076cf0f3f8b9b5f28ba081b1401a92fb8e94d6282f55b7741362f715376d141f', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1065, hash: '1024dc87e9b5cb2468e16c9193be77810d9a545ca1e1e4ecdaed5ec0ccf56c1f', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'Miami/attractions/index.html': {size: 8125, hash: 'b59b1d6646a822a50924a927b5694031f1b51dba20674cf4dbb2f3dacdd718b5', text: () => import('./assets-chunks/Miami_attractions_index_html.mjs').then(m => m.default)},
    'Miami/Miami/index.html': {size: 8197, hash: '04e29c1aea2043b6afeac875ae5121df9c633cf9c9f52934a8d3817d604ee551', text: () => import('./assets-chunks/Miami_Miami_index_html.mjs').then(m => m.default)},
    'styles-DZ6UBGXD.css': {size: 231612, hash: 'B2Fy9V+bfZo', text: () => import('./assets-chunks/styles-DZ6UBGXD_css.mjs').then(m => m.default)}
  },
};
