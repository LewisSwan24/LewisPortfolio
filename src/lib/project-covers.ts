/**
 * One real image per case, for the places a reader decides whether to open
 * it: the homepage deck and the /projects index. Every file but one is one the
 * case page already shows, and every alt text is the one that page already uses,
 * except MazeRunners, whose cover is the exhibition photo from the portfolio PDF.
 *
 * Unlisted cases (see UNLISTED_PROJECT_SLUGS) carry no cover.
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
  grassland: {
    src: "/projects/grassland/03-mission-02.jpg",
    width: 1280,
    height: 720,
    alt: {
      en: "Mission two: resources, unit status and objectives around a battlefield that fills most of the screen",
      zh: "第二关：资源、人物状态与目标围在四周，主战场占据大部分画面",
    },
    fit: "cover",
  },
  onthebeat: {
    src: "/projects/onthebeat/03-match.jpg",
    width: 786,
    height: 1704,
    alt: {
      en: "Phone screen after both people agreed, showing names and the meeting place",
      zh: "双方都同意后的手机画面，显示名字和碰面地点",
    },
    fit: "contain",
  },
  lamplight: {
    src: "/projects/lamplight/02-board.jpg",
    width: 1280,
    height: 720,
    alt: {
      en: "The café with Wick's plan on the blackboard card: seven steps, three crossed off, the fourth under way",
      zh: "咖啡馆里 Wick 写在黑板卡上的计划：七个步骤，划掉三个，第四个正在进行",
    },
    fit: "cover",
  },
  autofill: {
    src: "/projects/autofill/01-form-filled.png",
    width: 1280,
    height: 900,
    alt: {
      en: "A Chinese application form filled from the sample resume, with the summary card showing 45 filled, 1 needing review and 1 not filled",
      zh: "用示例简历填好的中文申请表，摘要卡显示已填 45、待确认 1、未填 1",
    },
    fit: "cover",
  },
  walkie: {
    src: "/projects/walkie/01-architecture.svg",
    width: 1280,
    height: 720,
    alt: {
      en: "Walkie architecture schematic connecting M5StickS3 dual-boot firmware, AES-256-GCM USB or Fly.io relay, Node 24 bridge, and Claude Code permission approvals",
      zh: "Walkie 系统架构示意图：连接 M5StickS3 双启动固件、AES-256-GCM USB 或 Fly.io 中继、Node 24 桥接与 Claude Code 权限审批队列",
    },
    fit: "contain",
  },
  fencepost: {
    src: "/projects/fencepost/01-ringtail-brisbane.jpg",
    width: 1200,
    height: 800,
    alt: {
      en: "A Brisbane ringtail possum frame from the Fencepost community wildlife storyboard",
      zh: "Fencepost 布里斯班社区野生动物故事板中的环尾负鼠画面",
    },
    fit: "cover",
  },
} satisfies Record<string, ProjectCover>;

export function getProjectCover(slug: string): ProjectCover | undefined {
  return (PROJECT_COVERS as Record<string, ProjectCover>)[slug];
}
