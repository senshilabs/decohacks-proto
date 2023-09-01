/* eslint-disable no-useless-escape */
import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document'

const SITE_NAME = 'EXAMPLE'
const SITE_TITLE = 'EXAMPLE'
const SITE_DESCRIPTION = 'EXAMPLE DESCRIPTION. '
const SITE_IMAGE = '/images/test_image.png'

// const GOOGLE_ANALYTICS_ID = 'G-입력해주세요'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  //   사용자를 Internet Explorer에서 Edge로 redirect 하도록 유도
  redirectIEtoEdge() {
    return {
      __html: `
      if(/MSIE \d|Trident.*rv:/.test(navigator.userAgent)) {
        window.location = 'microsoft-edge:' + window.location;
        setTimeout(function() {
          window.location = 'https://go.microsoft.com/fwlink/?linkid=2135547';
        }, 1);
      }`,
    }
  }

  render() {
    return (
      <Html>
        <Head>
          <script dangerouslySetInnerHTML={this.redirectIEtoEdge()} />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;700&family=Noto+Sans+KR:wght@300;400;500;700&display=swap"
            rel="stylesheet"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css"
          />
          {/* SEO */}
          {/* OG TAG (Open Graph) : 소셜 미디어에 공유될 때 미리보기에 사용되는 메타 데이터를 정의하기 위한 태그 */}
          <link rel="apple-touch-icon" href="/icons/test_image.png" />
          {/* 높은 해상도의 ios 기기 */}
          <link
            rel="apple-touch-icon"
            sizes="152x152"
            href="/icons/test_image.png"
          />
          {/* iPad용 아이콘 */}
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/icons/test_image.png"
          />
          {/*  iPad Pro용 아이콘 */}
          <link
            rel="apple-touch-icon"
            sizes="167x167"
            href="/icons/test_image.png"
          />
          {/* web app으로 선언하여 브라우저 UI (URL바)를 안보이도록 할 수 있게 만듬 */}
          <meta name="apple-mobile-web-app-capable" content="yes" />
          {/* 웹페이지 상세 설명 (검색 시 페이지의 제목 아래 페이지 내용의 요약) */}
          <meta name="description" content={SITE_DESCRIPTION} />
          <meta property="og:type" content="website" />
          {/* 웹사이트 이름 */}
          <meta property="og:site_name" content={SITE_NAME} />
          {/* 웹사이트 제목 */}
          <meta property="og:title" content={SITE_TITLE} />
          <meta property="og:description" content={SITE_DESCRIPTION} />
          <meta property="og:image" content={SITE_IMAGE} />
          {/* 트위터 스니펫 */}
          {/* Twitter 카드는 트위터로 링크를 공유할 때 해당 링크의 미리보기를 지정하는 데 사용되는 기능 */}
          {/* 큰 이미지가 포함된 카드 스타일 */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content={SITE_NAME} />
          <meta name="twitter:title" content={SITE_TITLE} />
          <meta name="twitter:description" content={SITE_DESCRIPTION} />
          <meta property="twitter:image" content={SITE_IMAGE} />
          {/*  모바일 기기에서 자동으로 감지되는 형식을 비활성화하는 역할 */}
          {/* 전화번호, 주소, 이메일 주소 등의 자동 링크 기능이 비활성화 */}
          <meta
            name="format-detection"
            content="telephone=no, address=no, email=no"
          />
          <link rel="shortcut icon" href="/favicon.ico" />
          {/* 웹 앱 매니페스트(Web App Manifest) 파일을 지정 */}
          {/* 웹 페이지를 앱으로서 설치하고자 할 때 필요한 정보들을 담고 있음 */}
          <link rel="manifest" href="/manifest.json" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
