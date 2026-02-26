export type Language = "en" | "zh";

export const defaultLanguage: Language = "en";

const dictionaries = {
  en: {
    nav: {
      home: "Home",
      projects: "Projects",
      about: "About",
      contact: "Contact",
      resume: "Resume",
      blog: "Blog",
      more: "More",
    },
    search: {
      placeholder: "Search projects and blog posts...",
      noResults: "No results found",
      recentSearches: "Recent searches",
    },
    common: {
      featured: "Featured",
      viewCaseStudy: "View Case Study",
      scroll: "Scroll",
    },
    cta: {
      letsTalk: "Let's Talk",
      openToOpportunities: "Open to opportunities",
      viewProjects: "View Projects",
      viewAll: "View All →",
      downloadResume: "Download Resume",
      getInTouch: "Get In Touch",
    },
    skipLink: "Skip to main content",
    footer: {
      navigation: "Navigation",
      getInTouch: "Get In Touch",
      downloadResume: "Download Resume",
      builtWith: "Built with",
      allRightsReserved: "All rights reserved.",
    },
    mobileMenu: {
      open: "Open menu",
      close: "Close menu",
    },
    home: {
      greeting: "Hi, I'm ",
      findMeOn: "Find me on",
      portfolioLabel: "Portfolio",
      featuredProjects: "Featured Projects",
      featuredProjectsDescription:
        "Selected case studies showcasing my design process and problem-solving approach.",
      expertise: "Expertise",
      skillsAndTools: "Skills & Tools",
      skillsAndToolsDescription:
        "Core competencies developed through academic study and hands-on projects.",
      letsWorkTogether: "Let's Work Together",
      letsWorkTogetherDescription:
        "I'm currently looking for internship opportunities and excited to contribute to meaningful design projects.",
      featuredProjectsEmpty: "Featured projects coming soon.",
      stats: {
        userInterviews: "User Interviews",
        treeTestParticipants: "Tree Test Participants",
        taskSuccessRate: "Task Success Rate",
        findabilityRate: "Findability Rate",
      },
    },
    about: {
      badge: "About Me",
      title: {
        prefix: "Crafting ",
        highlight: "meaningful",
        suffix: " digital experiences",
      },
      intro: {
        p1: "I'm currently pursuing a Master of Interaction Design at The University of Queensland, where I'm developing expertise in user research, prototyping, and human-centered design methodologies.",
        p2: "My approach combines analytical thinking with creative problem-solving. I believe that great design emerges from deeply understanding user needs and iterating towards solutions that are both functional and delightful.",
      },
      profilePhoto: "Profile Photo",
      sections: {
        philosophy: {
          label: "Philosophy",
          title: "Design Principles",
          description: "Core values that guide every design decision I make.",
        },
        toolbox: {
          label: "Skills",
          title: "My Toolbox",
          description: "Technologies and tools I work with regularly.",
        },
        journey: {
          label: "Journey",
          title: "My Path",
          description: "Key milestones in my design journey.",
        },
        personal: {
          label: "Personal",
          title: "Beyond Design",
          description: "A few things about me outside of work.",
        },
      },
      designPrinciples: [
        {
          icon: "👤",
          title: "User-Centered",
          description:
            "Every design decision starts with understanding real user needs through research and empathy.",
        },
        {
          icon: "🔄",
          title: "Iterative Process",
          description:
            "Embrace continuous improvement through prototyping, testing, and refinement cycles.",
        },
        {
          icon: "♿",
          title: "Accessible by Default",
          description:
            "Design inclusive experiences that work for everyone, regardless of ability or context.",
        },
        {
          icon: "📊",
          title: "Evidence-Based",
          description:
            "Ground design choices in data, research findings, and validated user feedback.",
        },
      ],
      toolCategories: [
        {
          name: "Design",
          tools: [
            "Figma",
            "Adobe XD",
            "Sketch",
            "Framer",
            "Photoshop",
            "Illustrator",
          ],
        },
        {
          name: "Research",
          tools: [
            "Miro",
            "Notion",
            "Maze",
            "Hotjar",
            "UserTesting",
            "Optimal Workshop",
          ],
        },
        {
          name: "Development",
          tools: [
            "HTML/CSS",
            "JavaScript",
            "React",
            "TypeScript",
            "Tailwind CSS",
            "Next.js",
          ],
        },
      ],
      timeline: [
        {
          year: "2024",
          title: "Master of Interaction Design",
          org: "The University of Queensland",
          description:
            "Advanced study in human-computer interaction, UX research, and design thinking.",
        },
        {
          year: "2023",
          title: "Started Design Journey",
          org: "Self-directed Learning",
          description:
            "Began exploring UX/UI design through online courses and personal projects.",
        },
      ],
      funFacts: [
        { emoji: "📚", label: "Avid reader" },
        { emoji: "☕", label: "Coffee enthusiast" },
        { emoji: "🎮", label: "Casual gamer" },
        { emoji: "🌏", label: "Love exploring" },
      ],
    },
    contact: {
      hero: {
        title: {
          prefix: "Let's ",
          highlight: "Create",
          suffix: " Something Amazing",
        },
        description:
          "I'm always open to discussing new projects, design opportunities, or just having a friendly chat about UX and design.",
      },
      methods: {
        email: {
          title: "Email",
          description: "Drop me a line anytime",
          action: "Send Email",
        },
        linkedin: {
          title: "LinkedIn",
          description: "Let's connect professionally",
          value: "View Profile",
          action: "Connect",
        },
        location: {
          title: "Location",
          description: "Based in",
        },
      },
      form: {
        label: "Message",
        title: "Send a Message",
        description:
          "Fill out the form below and I'll get back to you as soon as possible.",
        fields: {
          name: { label: "Name", placeholder: "John Doe" },
          email: { label: "Email", placeholder: "john@example.com" },
          subject: { label: "Subject", placeholder: "What's this about?" },
          message: {
            label: "Message",
            placeholder: "Tell me about your project, idea, or just say hello...",
          },
        },
        noticeUnconfigured:
          "Form submission is not configured yet. For now, please email me directly.",
        submit: "Send Message",
      },
      faq: {
        label: "FAQ",
        title: "Frequently Asked",
        items: [
          {
            q: "What's your typical response time?",
            a: "I usually respond to emails within 24-48 hours. For urgent matters, feel free to reach out on LinkedIn.",
          },
          {
            q: "Are you available for freelance work?",
            a: "I'm currently focused on my studies but open to interesting projects. Let's chat about what you have in mind!",
          },
          {
            q: "What kind of projects interest you?",
            a: "I'm passionate about user-centered design, accessibility, and creating delightful digital experiences. Mobile apps, web platforms, and design systems all excite me.",
          },
        ],
      },
    },
    resume: {
      title: "Resume",
      description:
        "Download my resume to learn more about my experience and qualifications.",
      cardTitle: "{name}'s Resume",
      cardMeta: "PDF format • Last updated December 2024",
      downloadPdf: "Download Resume (PDF)",
      downloadPdfShort: "Download PDF",
      getInTouch: "Get in Touch",
      printHint: "Tip: Use your browser's print function (Ctrl/Cmd + P) to save this page as a PDF",
      overview: {
        education: "Education",
        experienceHighlights: "Experience Highlights",
      },
      sections: {
        education: "Education",
        experience: "Experience",
        skills: "Skills",
        certifications: "Certifications",
        awards: "Awards & Recognition",
      },
      education: {
        degree: "Master of Interaction Design",
        institutionAndYears: "The University of Queensland • 2023 – Present",
      },
      experience: [
        { title: "UX Design Intern", orgAndYear: "Design Studio Co. • 2024" },
        { title: "Freelance Designer", orgAndYear: "Self-employed • 2022 – 2023" },
      ],
    },
    blog: {
      title: "Blog",
      description: "Thoughts on UX design, interaction design, and design thinking.",
      emptyTitle: "No blog posts yet",
      emptyDescription: "Check back soon for articles on design thinking and UX best practices.",
      breadcrumbHome: "Home",
      breadcrumbBlog: "Blog",
      by: "By",
      subscribe: "Subscribe to updates",
      subscribeDescription: "Get notified when I publish new articles or projects.",
      subscribePlaceholder: "your@email.com",
      subscribeButton: "Subscribe",
      subscribeSuccess: "Thanks for subscribing! Check your email to confirm.",
      subscribeError: "Something went wrong. Please try again.",
      subscribeNote: "No spam, unsubscribe at any time.",
      rss: "RSS Feed",
      relatedArticles: "Related Articles",
      prev: "Previous",
      next: "Next",
    },
    lab: {
      title: "Lab",
      description: "A collection of interactive experiments and UI components. These are the building blocks that power this portfolio.",
      magneticButtons: {
        title: "Magnetic Buttons",
        description: "Buttons that subtly follow your mouse movement. Hover over them to see the effect.",
        hover: "Hover Me",
        secondary: "Secondary",
        ghost: "Ghost",
      },
      tiltCards: {
        title: "3D Card Tilt",
        description: "Cards that tilt in 3D space following cursor position. Move your mouse over the card.",
        design: "Design",
        designDesc: "Beautiful interfaces with thoughtful interactions",
        performance: "Performance",
        performanceDesc: "Optimized for speed and smooth animations",
        accessibility: "Accessibility",
        accessibilityDesc: "Inclusive design for all users",
      },
      glassMorphism: {
        title: "Glass Morphism",
        description: "Modern frosted glass UI effects with blur and transparency.",
        glassCard: "Glass Card",
        glassCardDesc: "This card uses backdrop-blur for a frosted glass effect",
        heavyGlass: "Heavy Glass",
        heavyGlassDesc: "More opaque background with stronger blur",
      },
      animations: {
        title: "Animation Playground",
        description: "Smooth animations and transitions used throughout the site.",
        fadeIn: "Fade In",
        scaleIn: "Scale In",
        float: "Float",
      },
      about: {
        title: "About These Experiments",
        description: "All these interactive components are built with React, TypeScript, and Framer Motion. They're designed to enhance user experience without compromising performance or accessibility.",
        features: [
          "Custom cursor enhances navigation on desktop",
          "Magnetic buttons provide subtle tactile feedback",
          "3D tilt cards add depth and engagement",
          "All animations respect prefers-reduced-motion",
        ],
      },
    },
    projects: {
      title: "Projects",
      description: "Case studies and design work from academic and personal projects.",
      searchPlaceholder: "Search projects...",
      all: "All",
      empty: "No projects found matching your criteria.",
      clearFilters: "Clear filters",
    },
    project: {
      backToProjects: "← Back to Projects",
      role: "Role",
      timeline: "Timeline",
      tools: "Tools",
      shareHelpful: "Found this helpful? Share it!",
      relatedProjects: "Related Projects",
      relatedProjectsDescription: "Explore more projects with similar themes and approaches",
    },
    notFound: {
      title: "Page not found",
      description:
        "Sorry, we couldn't find the page you're looking for. Perhaps you've mistyped the URL or the page has been moved.",
      goHome: "Go back home",
      viewProjects: "View projects",
      tryPopular: "Or try these popular pages:",
    },
    languageToggle: {
      toEnglish: "EN",
      toChinese: "中文",
      ariaLabelToEnglish: "Switch language to English",
      ariaLabelToChinese: "切换到中文",
    },
  },
  zh: {
    nav: {
      home: "首页",
      projects: "项目",
      about: "关于",
      contact: "联系",
      resume: "简历",
      blog: "博客",
      more: "更多",
    },
    search: {
      placeholder: "搜索项目和博客文章...",
      noResults: "未找到结果",
      recentSearches: "最近搜索",
    },
    common: {
      featured: "精选",
      viewCaseStudy: "查看案例",
      scroll: "滚动",
    },
    cta: {
      letsTalk: "聊聊合作",
      openToOpportunities: "正在寻找机会",
      viewProjects: "查看项目",
      viewAll: "查看全部 →",
      downloadResume: "下载简历",
      getInTouch: "联系我",
    },
    skipLink: "跳到主要内容",
    footer: {
      navigation: "导航",
      getInTouch: "联系",
      downloadResume: "下载简历",
      builtWith: "技术栈",
      allRightsReserved: "保留所有权利。",
    },
    mobileMenu: {
      open: "打开菜单",
      close: "关闭菜单",
    },
    home: {
      greeting: "你好，我是",
      findMeOn: "社交平台",
      portfolioLabel: "作品集",
      featuredProjects: "精选项目",
      featuredProjectsDescription: "精选案例展示我的设计过程与解决问题能力。",
      expertise: "能力",
      skillsAndTools: "技能与工具",
      skillsAndToolsDescription: "通过课程与项目实践形成的核心能力。",
      letsWorkTogether: "一起合作",
      letsWorkTogetherDescription: "我正在寻找实习机会，期待参与有意义的设计项目。",
      featuredProjectsEmpty: "精选项目即将上线。",
      stats: {
        userInterviews: "用户访谈",
        treeTestParticipants: "树测参与者",
        taskSuccessRate: "任务成功率",
        findabilityRate: "可发现率",
      },
    },
    about: {
      badge: "关于我",
      title: {
        prefix: "打造",
        highlight: "有意义的",
        suffix: "数字体验",
      },
      intro: {
        p1: "我目前正在昆士兰大学攻读交互设计硕士，在学习中不断提升用户研究、原型制作与以人为本的设计方法能力。",
        p2: "我的方法结合了分析性思维与创造性的解决问题能力。我相信优秀的设计来自对用户需求的深入理解，并通过持续迭代打磨出既实用又令人愉悦的方案。",
      },
      profilePhoto: "个人照片",
      sections: {
        philosophy: {
          label: "理念",
          title: "设计原则",
          description: "指导我每一个设计决策的核心价值。",
        },
        toolbox: {
          label: "技能",
          title: "工具箱",
          description: "我经常使用的技术与工具。",
        },
        journey: {
          label: "经历",
          title: "我的路径",
          description: "设计旅程中的关键里程碑。",
        },
        personal: {
          label: "个人",
          title: "设计之外",
          description: "工作之外关于我的一些小事。",
        },
      },
      designPrinciples: [
        {
          icon: "👤",
          title: "以用户为中心",
          description: "每一次设计决策都从理解真实用户需求开始，通过研究与共情找到关键洞察。",
        },
        {
          icon: "🔄",
          title: "迭代式流程",
          description: "通过原型、测试与不断优化的循环持续改进，逐步接近更好的解决方案。",
        },
        {
          icon: "♿",
          title: "默认可访问",
          description: "设计包容性的体验，让不同能力与不同情境的用户都能顺畅使用。",
        },
        {
          icon: "📊",
          title: "以证据为依据",
          description: "用数据、研究结论与验证过的反馈来支撑设计选择。",
        },
      ],
      toolCategories: [
        {
          name: "设计",
          tools: [
            "Figma",
            "Adobe XD",
            "Sketch",
            "Framer",
            "Photoshop",
            "Illustrator",
          ],
        },
        {
          name: "研究",
          tools: [
            "Miro",
            "Notion",
            "Maze",
            "Hotjar",
            "UserTesting",
            "Optimal Workshop",
          ],
        },
        {
          name: "开发",
          tools: [
            "HTML/CSS",
            "JavaScript",
            "React",
            "TypeScript",
            "Tailwind CSS",
            "Next.js",
          ],
        },
      ],
      timeline: [
        {
          year: "2024",
          title: "交互设计硕士",
          org: "昆士兰大学",
          description: "深入学习人机交互、UX 研究与设计思维。",
        },
        {
          year: "2023",
          title: "开始设计之旅",
          org: "自学",
          description: "通过线上课程与个人项目探索 UX/UI 设计。",
        },
      ],
      funFacts: [
        { emoji: "📚", label: "爱读书" },
        { emoji: "☕", label: "咖啡爱好者" },
        { emoji: "🎮", label: "休闲玩家" },
        { emoji: "🌏", label: "喜欢探索" },
      ],
    },
    contact: {
      hero: {
        title: {
          prefix: "一起",
          highlight: "创造",
          suffix: "精彩体验",
        },
        description:
          "我很乐意聊聊新的项目与设计机会，也欢迎就 UX 与设计来一次轻松的交流。",
      },
      methods: {
        email: {
          title: "邮箱",
          description: "随时给我发邮件",
          action: "发送邮件",
        },
        linkedin: {
          title: "领英",
          description: "职业联系",
          value: "查看主页",
          action: "添加联系",
        },
        location: {
          title: "所在地",
          description: "常驻",
        },
      },
      form: {
        label: "留言",
        title: "发送消息",
        description: "填写下方表单，我会尽快回复你。",
        fields: {
          name: { label: "姓名", placeholder: "张三" },
          email: { label: "邮箱", placeholder: "you@example.com" },
          subject: { label: "主题", placeholder: "想聊什么？" },
          message: {
            label: "内容",
            placeholder: "告诉我你的项目想法，或者简单打个招呼…",
          },
        },
        noticeUnconfigured: "表单尚未配置，请直接发邮件给我。",
        submit: "发送",
      },
      faq: {
        label: "常见问题",
        title: "常见问题",
        items: [
          {
            q: "一般多久会回复？",
            a: "我通常会在 24–48 小时内回复邮件。如有紧急事项，也可以通过领英联系我。",
          },
          {
            q: "可以接自由职业项目吗？",
            a: "我目前以学习为主，但也愿意了解有趣的项目。欢迎聊聊你的想法！",
          },
          {
            q: "你更感兴趣的项目类型是什么？",
            a: "我关注以用户为中心的设计、可访问性以及令人愉悦的数字体验。移动端、Web 平台与设计系统相关项目都很吸引我。",
          },
        ],
      },
    },
    resume: {
      title: "简历",
      description: "下载简历，了解更多我的经历与能力。",
      cardTitle: "{name}的简历",
      cardMeta: "PDF格式 • 最后更新：2024年12月",
      downloadPdf: "下载简历（PDF）",
      downloadPdfShort: "下载 PDF",
      getInTouch: "联系我",
      printHint: "提示：使用浏览器的打印功能（Ctrl/Cmd + P）可将此页保存为 PDF",
      overview: {
        education: "教育经历",
        experienceHighlights: "经历亮点",
      },
      sections: {
        education: "教育经历",
        experience: "工作经历",
        skills: "技能",
        certifications: "证书",
        awards: "获奖与荣誉",
      },
      education: {
        degree: "交互设计硕士",
        institutionAndYears: "昆士兰大学 • 2023 – 至今",
      },
      experience: [
        { title: "UX 设计实习生", orgAndYear: "设计工作室 • 2024" },
        { title: "自由职业设计师", orgAndYear: "自由职业 • 2022 – 2023" },
      ],
    },
    blog: {
      title: "博客",
      description: "关于 UX 设计、交互设计与设计思维的思考。",
      emptyTitle: "暂无博客文章",
      emptyDescription: "敬请期待关于设计思维和 UX 最佳实践的文章。",
      breadcrumbHome: "首页",
      breadcrumbBlog: "博客",
      by: "作者",
      subscribe: "订阅更新",
      subscribeDescription: "新文章或项目发布时会通知你。",
      subscribePlaceholder: "your@email.com",
      subscribeButton: "订阅",
      subscribeSuccess: "感谢订阅！请查看邮箱确认。",
      subscribeError: "出了点问题，请重试。",
      subscribeNote: "无垃圾邮件，随时退订。",
      rss: "RSS 订阅",
      relatedArticles: "相关文章",
      prev: "上一篇",
      next: "下一篇",
    },
    lab: {
      title: "实验室",
      description: "一系列交互实验和 UI 组件的合集，它们是构建本作品集的基础模块。",
      magneticButtons: {
        title: "磁性按钮",
        description: "按钮会微妙地跟随鼠标移动，将鼠标悬停在上方查看效果。",
        hover: "悬停试试",
        secondary: "次要",
        ghost: "透明",
      },
      tiltCards: {
        title: "3D 倾斜卡片",
        description: "卡片在 3D 空间中跟随光标位置倾斜，将鼠标移到卡片上方。",
        design: "设计",
        designDesc: "精心打磨的交互界面",
        performance: "性能",
        performanceDesc: "为速度和流畅动画而优化",
        accessibility: "无障碍",
        accessibilityDesc: "面向所有用户的包容性设计",
      },
      glassMorphism: {
        title: "毛玻璃效果",
        description: "使用模糊和透明度的现代磨砂玻璃 UI 效果。",
        glassCard: "玻璃卡片",
        glassCardDesc: "这张卡片使用了 backdrop-blur 实现磨砂玻璃效果",
        heavyGlass: "深度玻璃",
        heavyGlassDesc: "更不透明的背景和更强的模糊效果",
      },
      animations: {
        title: "动画演示",
        description: "贯穿整个网站的流畅动画和过渡效果。",
        fadeIn: "淡入",
        scaleIn: "缩放进入",
        float: "浮动",
      },
      about: {
        title: "关于这些实验",
        description: "所有这些交互组件都使用 React、TypeScript 和 Framer Motion 构建，旨在增强用户体验而不影响性能或可访问性。",
        features: [
          "自定义光标增强桌面端导航",
          "磁性按钮提供微妙的触觉反馈",
          "3D 倾斜卡片增加深度和参与感",
          "所有动画尊重 prefers-reduced-motion 设置",
        ],
      },
    },
    projects: {
      title: "项目",
      description: "来自课程与个人项目的案例研究与设计作品。",
      searchPlaceholder: "搜索项目…",
      all: "全部",
      empty: "没有找到符合条件的项目。",
      clearFilters: "清除筛选",
    },
    project: {
      backToProjects: "← 返回项目列表",
      role: "角色",
      timeline: "周期",
      tools: "工具",
      shareHelpful: "觉得有帮助？分享给朋友！",
      relatedProjects: "相关项目",
      relatedProjectsDescription: "探索更多主题和方法相似的项目",
    },
    notFound: {
      title: "页面未找到",
      description: "抱歉，未找到你访问的页面。可能链接有误或页面已移动。",
      goHome: "返回首页",
      viewProjects: "查看项目",
      tryPopular: "或者试试这些热门页面：",
    },
    languageToggle: {
      toEnglish: "EN",
      toChinese: "中文",
      ariaLabelToEnglish: "切换到英文",
      ariaLabelToChinese: "切换到中文",
    },
  },
};

export type Dictionary = (typeof dictionaries)["en"];

export function normalizeLanguage(value: string | undefined): Language {
  return value === "zh" ? "zh" : "en";
}

export function getDictionary(lang: Language): Dictionary {
  return dictionaries[lang] ?? dictionaries[defaultLanguage];
}
