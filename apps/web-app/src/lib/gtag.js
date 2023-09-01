export const GA_TRACKING_ID = 'G-XXXX아이디'

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
// 조회수 측정
export const pageview = (url) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  })
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
// Google 애널리틱스 이벤트 측정
export const event = ({ action, category, label, value }) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  })
}
