/**
 * One real image per case, for the places a reader decides whether to open
 * it: the homepage deck and the /projects index. Every file but one is one the
 * case page already shows, and every alt text is the one that page already uses,
 * except MazeRunners, whose cover is the exhibition photo from the portfolio PDF.
 *
 * Spectra Lens has no screenshot or photo, so it keeps its diagram rather than
 * borrowing an image that is not of it.
 */

export interface ProjectCover {
  src: string;
  width: number;
  height: number;
  alt: { en: string; zh: string };
  /** Phone screens are portrait; letterbox them instead of cropping the UI. */
  fit: "cover" | "contain";
}

export const PROJECT_COVERS = {
  maze: {
    // The exhibition photo the portfolio PDF uses: hands, sleeves and the lit
    // maze, no faces. The case page's own setup shot has a caption baked in.
    src: "/projects/maze/06-final-contact.jpg",
    width: 1800,
    height: 1200,
    alt: {
      en: "Two players' hands over the lit maze at the exhibition, each finger in a wired sleeve",
      zh: "展览现场，两位玩家的手悬在亮着灯的迷宫上方，手指都套着接了线的指套",
    },
    fit: "cover",
  },
  gapmapper: {
    src: "/projects/gapmapper/01-route-options.png",
    width: 3768,
    height: 1650,
    alt: {
      en: "Five phone screens side by side: the same trip as five route options, each overlaying risk density, lighting, surveillance or open-business layers, with trip duration marked",
      zh: "五个手机界面并排：同一趟行程的五种路线方案，分别叠加风险密度、路灯、监控与营业店铺图层，各自标出行程时长",
    },
    fit: "contain",
  },
  connect: {
    src: "/projects/connect/02-app-studybuddy.png",
    width: 1170,
    height: 2532,
    alt: {
      en: "A study-buddy match card showing 94% match beside the course, library, availability and small-group size",
      zh: "学习伙伴匹配卡：94% 契合度旁边列着课程、图书馆、可用时间与小组规模",
    },
    fit: "contain",
  },
  pricewise: {
    src: "/projects/pricewise/01-home.png",
    width: 2880,
    height: 1800,
    alt: {
      en: "The PriceWise home screen",
      zh: "PriceWise 首页",
    },
    fit: "cover",
  },
  hoop: {
    src: "/projects/hoop/01-main-menu.png",
    width: 1280,
    height: 800,
    alt: {
      en: "Hoop Dream main menu, with the title set in a large terracotta serif on warm parchment",
      zh: "Hoop Dream 主菜单，赤陶色衬线大标题落在暖色羊皮纸底上",
    },
    fit: "cover",
  },
  rules: {
    src: "/projects/rules/01-fietspad-ui.png",
    width: 2093,
    height: 1361,
    alt: {
      en: "Three dark-theme phone screens: a home screen with mode selection and recent routes, a planning screen with a rider profile, and a riding screen with a left-hook warning and hazard list",
      zh: "三张深色主题的手机界面：模式选择与最近路线的首页、含骑行档案的规划页、以及骑行中的左勾弯风险提示与危险清单",
    },
    fit: "contain",
  },
} satisfies Record<string, ProjectCover>;

export function getProjectCover(slug: string): ProjectCover | undefined {
  return (PROJECT_COVERS as Record<string, ProjectCover>)[slug];
}
