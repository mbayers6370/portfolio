import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import App from './App'
import { getPageSeo } from './content/seo'
import { renderSeoHead } from './lib/seo'

export { seoPages, routeAliases, siteOrigin } from './content/seo'
export { renderAgentFiles } from './lib/agent-content'

export function render(pathname: string) {
  return {
    head: renderSeoHead(getPageSeo(pathname)),
    body: renderToString(<StaticRouter location={pathname}><App /></StaticRouter>),
  }
}
