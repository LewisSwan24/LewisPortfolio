import type { CaseRecord } from "@/lib/cases/schema";

export const gapmapperCase: CaseRecord = {
  "slug": "gapmapper",
  "status": "unlisted",
  "roleTracks": [
    "product",
    "interaction"
  ],
  "workSummary": {
    "tags": ["research"],
    "year": "2026",
    "dur": "Coursework (unlisted)",
    "problem": {
      "en": "Safety route-ranking apps claim predictive authority the underlying lighting data cannot earn",
      "zh": "为步行路线给出安全排名容易制造一种底层的照明/治安数据根本支撑不住的权威错觉"
    },
    "changed": {
      "en": "Refused numeric safety scores and shifted team direction to transparent perception reflection",
      "zh": "取消安全分排序，把方向重构为暴露线索不确定性的慢界面记录"
    }
  },
  "reviewMeta": {
    "reviewedAt": "2026-11-21",
    "nextReviewAt": "2027-02-21",
    "auditNote": "Confirmed unlisted archive status and DECO7380 submission boundaries for V3.1 baseline."
  },
  "links": [],
  "media": {
    "label": "The prototype I argued against",
    "labelZh": "我主张放弃的那版原型",
    "blurb": "The route-support prototype, kept in the portfolio because it is the evidence for the turn. It looked extremely usable — which is exactly what made it dangerous.",
    "blurbZh": "那版路线支持原型。留在作品集里，是因为这就是那次转向的证据。看起来非常实用，危险恰恰在这里。",
    "images": [
      {
        "src": "/projects/gapmapper/01-route-options.png",
        "width": 3768,
        "height": 1650,
        "alt": "Five phone screens side by side: the same trip as five route options, each overlaying risk density, lighting, surveillance or open-business layers, with trip duration marked",
        "altZh": "五个手机界面并排：同一趟行程的五种路线方案，分别叠加风险密度、路灯、监控与营业店铺图层，各自标出行程时长",
        "caption": "The version I built: one trip, scored and ranked by different cues. A system that recommends a safer route without being able to guarantee safety has acquired an authority it never earned.",
        "captionZh": "我建的那一版：同一趟行程按不同线索评分排序。一个建议「更安全路线」却保证不了安全的系统，获得了一种自己没有挣来的权威。"
      }
    ]
  },
  "card": {
    "en": {
      "kicker": "Public space · Evidence boundaries",
      "title": "Perception Gap Mapper",
      "sub": "I built the working prototype, then argued for abandoning it — because an interface that cannot guarantee safety should not tell anyone which route is safer.",
      "role": "Team project · prototype and repositioning mine",
      "date": "2026 · DECO7380, submitted and marked",
      "m1": "18 interviews · 3 of them mine",
      "m2": "6 slow screens, 4 questions each",
      "m3": "No safety score, by requirement"
    },
    "zh": {
      "kicker": "公共空间 · 证据边界",
      "title": "走夜路",
      "sub": "我先做出了一个能用的原型，然后主张放弃：一个不能保证安全的界面，凭什么告诉别人哪条路更安全。",
      "role": "团队项目 · 原型与方向转变由我推动",
      "date": "2026 · DECO7380，已提交并评分",
      "m1": "18 个访谈 · 我做 3 个",
      "m2": "6 屏慢界面，每屏过 4 个问题",
      "m3": "不出安全分数，写成硬性要求"
    }
  },
  "narrative": {
    "en": {
      "hero": {
        "title": "Perception Gap Mapper",
        "sub": "I built the first working prototype, then argued for abandoning it. The better it looked, the more visible a promise it could not keep."
      },
      "roleVal": "Team project; I built the first prototype and drove the change of direction",
      "timeVal": "2026 · DECO7380 Design Computing Studio 3, submitted and marked",
      "teamVal": "Six",
      "toolsVal": "Semi-structured interviews · thematic coding · Figma · literature review",
      "ch": {
        "label": "The problem",
        "title": "A system that recommends a safer route claims an authority it has not earned.",
        "p": "The team had nothing demonstrable and I was the one who could turn discussion into code, so the first route-support prototype was mine. It ranked the same trip by different cues, with layers for risk density, lighting, surveillance and open businesses. It looked extremely usable — which is exactly what made it dangerous. It made an unsolved problem look solved."
      },
      "re": {
        "label": "Research",
        "title": "Three people differed on whether to trust a tool.",
        "m1": {
          "t": "What they relied on",
          "b": "Visibility, main roads, transit stops, bike coverage, streetlights, businesses still open, location sharing, live foot traffic. All three mentioned lighting. In the team's coding chart, people presence came up in 16 of the 18 interviews and lighting in 14: counts of mentions, not a rate."
        },
        "m2": {
          "t": "What they distrusted",
          "b": "Crime history. One participant was wary of routing by it because bias can already be inside the data before an algorithm touches it — and because a conclusion you cannot interrogate is not usable. I mis-read her point at first and went back to the notes after a teammate challenged me."
        },
        "m3": {
          "t": "An assumption that died",
          "b": "I had treated streetlights as a directly usable safety variable: more light, safer. Literature disagreed. Visibility, enclosure, nearby activity, social cues and time all change how one light is read. A lit street that is empty, enclosed and hard to leave still feels wrong."
        },
        "quote": "Making it Worse First",
        "quoteWho": "The team name, from a week-three exercise: ask what the worst version would do. After critique I realised those four descriptions were our own version."
      },
      "sy": {
        "label": "The core structure",
        "title": "Two kinds of evidence, side by side, never merged.",
        "p": "Objective indicators — lighting, transit access, incident context, sightlines, open businesses, street condition — sit next to perception signals: someone crossing to avoid one side, looking for a shop still open, checking help is close enough, feeling uncertain in a place that is entirely normal on paper. The gap between them is displayed as a reason to investigate, not as proof of danger. Merge them into one score and the uncertainty disappears; the screen starts looking more confident than it has any right to be."
      },
      "id": {
        "label": "The turn",
        "p": "After critique the first thing I changed was not a screen — it was the reader. From a pedestrian who is nervous right now, to councils, city planners and campus safety teams. Output changed with it: no longer telling anyone which way to walk, but showing where perception and objective indicators fail to agree. And the claim changed: it can support a discussion about what to investigate next, and it promises that nowhere is safe. Critique had named two design problems rather than feature gaps — painting safety as binary, and a women's-safety project that risks once again asking women to change their behavior instead of questioning the environment."
      },
      "pr": {
        "label": "The screen that carries it",
        "p": "Place Inspector is the load-bearing one. Selecting a place does not return a color block or a warning: it shows confidence level, source status, report context, and what the data still cannot prove. A red or orange marker on a real street starts to read as a verdict even when the evidence behind it is thin. I ran four questions over every screen — what does this make visible, what does it hide, who does it expect to act, how much certainty does it imply. The map is only the entry point; the argument lives in the slow screens: Place Inspector, Field Reports, Data Sources, Intervention Planner, Ethics Boundary, Export Brief."
      },
      "te": {
        "label": "Three interlocking deliverables",
        "p": "The final report sets the claim: move from route advice to the perception gap, because formal indicators and lived experience do not always agree — a street can be lit, well served by transit and low on recorded incidents, and still be unpleasant to walk. The one-page brief turns the claim into system requirements: reports anonymous, location rounded to a street segment, confidence level and bias notes displayed, no public safety score. The prototype turns those requirements into a flow that runs end to end. The brief was the hardest to write, because it stops an ethical position from being a sentence in a report."
      },
      "ou": {
        "label": "What this case produced",
        "m1": {
          "label": "interviews across the team; three are mine",
          "v": "18"
        },
        "m2": {
          "label": "deliverables that hold each other up",
          "v": "3"
        },
        "m3": {
          "label": "slow screens, four questions each",
          "v": "6"
        },
        "p": "A design direction that can be challenged: anonymous perception reports, objective layers, gap categories, per-place explanation, source limits, an exportable planning brief. A reviewer, planner or community member can point at a screen and question its logic — which is more useful than a handsome dashboard image. Evidence status: never tested with real planning staff, and parts of the data layer are an intended integration rather than a live pipeline. 18 interviews can count mentions; they cannot support a rate, a ranking or a score, which is why they are used as perception cues throughout."
      },
      "rf": {
        "label": "Reflection",
        "p": "The main lesson was not 'collect more data'. It was to work out what the data is allowed to claim. Australia already has established channels for residents to report local issues to council; we borrowed the flow but not the purpose — a perception report should not become a public danger warning, only a small planning signal to be checked against other evidence. Community-contributed geographic data can show planners what official layers miss, but it is not automatically complete, neutral or representative, which is why rounding, anonymity and bias notes are preconditions rather than features. I do not think the final proposal fully answers the critique it responded to. It changed what I am willing to claim: not 'help someone walk home safely', but 'help an institution see where its own evidence is incomplete'."
      }
    },
    "zh": {
      "hero": {
        "title": "走夜路",
        "sub": "我先做出了一个能用的原型，然后主张把它放弃。因为它做得越像样，一个它兑现不了的承诺就越显眼。"
      },
      "roleVal": "团队项目；第一个可用原型由我建，后来推动方向转变的也是我",
      "timeVal": "2026 · DECO7380 Design Computing Studio 3，已提交并评分",
      "teamVal": "六人",
      "toolsVal": "半结构式访谈 · 主题编码 · Figma · 文献综述",
      "ch": {
        "label": "问题",
        "title": "一个建议「更安全路线」的系统，获得了自己没有挣来的权威。",
        "p": "团队当时没有能演示的原型，而我是能把讨论变成代码的那个，所以第一版路线支持原型由我来建。它把同一趟行程按不同线索评分排序，叠加了风险密度、路灯、监控与营业店铺图层。看起来非常实用，危险恰恰在这里：让一个没解决的问题看上去像已经解决了。"
      },
      "re": {
        "label": "研究",
        "title": "三个人差在信不信一个工具。",
        "m1": {
          "t": "他们各自依赖的",
          "b": "能见度、主干道、公交站、自行车道覆盖、路灯、还开着的店、位置共享、实时人流。三个人都提到了路灯。团队的编码表里，18 个访谈有 16 个提到路上有没有人，14 个提到路灯；这是提及次数，不是比例。"
        },
        "m2": {
          "t": "他们明确不信的",
          "b": "犯罪率历史。有位受访者警惕按犯罪历史算路线，因为偏见可能在进入算法之前就已经在数据里了；也因为一个你无法追问的结论没法用。我一开始把她的意思读错了，是队友在群里质疑之后，我回去重看笔记才确认的。"
        },
        "m3": {
          "t": "一条被推翻的假设",
          "b": "我最初把路灯当成可以直接使用的安全变量：灯多则安全。文献不同意。能见度、围合感、周围有没有活动、社会线索、时间，都会改变一个人怎么解读同一盏灯。一条有灯的街，如果空、封闭、不好离开，照样让人不舒服。"
        },
        "quote": "Making it Worse First",
        "quoteWho": "团队名字，来自第三周的练习：先问最糟的那版会做什么。评图之后我才反应过来：那四条描述的正是我们自己那一版。"
      },
      "sy": {
        "label": "核心结构",
        "title": "两类证据并排放，不合并。",
        "p": "客观指标（照明、公交可达、事件背景、视野、还开着的店、街道状况）和感知信号并排：有人绕开某一侧走、找还开着的店、确认求助是否够近、在一个纸面上完全正常的地方感到不确定。两者的落差被当成「需要去查一查的理由」显示，不是「危险的证明」。一旦揉成一个分数，不确定性就消失了，屏幕开始显得比它应有的样子更自信。"
      },
      "id": {
        "label": "转折",
        "p": "评图之后我改的第一件事不是界面，是读者：从街上那个此刻正紧张的行人，换成市政机构、城市规划者、校园安全团队。输出跟着变：不再告诉人走哪条，而是显示感知和客观指标对不上的地方。主张也跟着变：它可以支持「接下来该查什么」的讨论，但不承诺任何地方是安全的。评图指出的是两个设计问题而不是功能缺口：把安全画成二元；以及一个女性安全项目，可能又一次在要求女性调整自己的行为，而不是去质问造成不安全的环境、系统和人。"
      },
      "pr": {
        "label": "承重的那一屏",
        "p": "Place Inspector。选中一个地点之后，它不给色块也不给警告：它显示信心水平、来源状态、上报背景，以及这些数据还证明不了什么。理由很直接：一个红色或橙色的标记落在真实街道上，会开始像一个判决，哪怕它背后的证据其实很薄。我给自己定了四个问题，每做一屏都过一遍：这一屏让什么可见、把什么藏起来了、期待谁去行动、暗示了多高的确定性。地图只是入口，论证发生在那几屏慢的：Place Inspector、Field Reports、Data Sources、Intervention Planner、Ethics Boundary、Export Brief。"
      },
      "te": {
        "label": "三件互相咬合的交付物",
        "p": "最终报告定主张：从「路线建议」转到感知落差，正式指标和亲身经验并不总是对得上，一条街可以有灯、有公交、事件记录也少，走起来仍然不舒服。一页 brief 把主张变成系统要求：上报匿名、位置取整到街段、必须显示信心水平与偏差标注、不出公开的安全分数。原型把这些要求变成一条能走通的规划流程。brief 是最难写的一份，因为它让伦理立场没法停留在报告里的一句话。"
      },
      "ou": {
        "label": "这个案例产出了什么",
        "m1": {
          "label": "个团队访谈，其中三个是我做的",
          "v": "18"
        },
        "m2": {
          "label": "件互相撑住的交付物",
          "v": "3"
        },
        "m3": {
          "label": "屏慢界面，每屏过四个问题",
          "v": "6"
        },
        "p": "一个可以被挑战的设计方向：匿名感知上报、客观图层、落差分类、选中地点的解释、来源限制、可导出的规划简报。评审、规划者或社区成员能指着某一屏质疑它的逻辑，这比只给一张漂亮的仪表板图有用。证据状态：原型未经真实规划人员测试，部分数据层是设想中的接入而非实时管线。18 个访谈只能数出提及次数，撑不起任何比例、排名或分数，所以整份工作里只当感知线索用。"
      },
      "rf": {
        "label": "反思",
        "p": "主要的教训不是「多收集数据」，是查清楚这些数据被允许声称什么。澳洲已经有居民向市政机构上报本地问题的成熟机制，我们借了这个流程但用途不同：一条感知上报不该变成一个公开的危险警告，它只是一个小小的规划信号，还要拿去和其他证据对照。社区贡献的地理数据能让规划者注意到官方图层漏掉的东西，但它不会自动就是完整的、中立的、有代表性的，所以取整、匿名、偏差标注这三条不是加分项，是前提。我也不认为最终提案完全回答了评审那条批评。它改变的是我愿意声称什么：不再说成「帮一个人安全地走夜路」，而是说成「让机构看见自己的证据在哪里不完整」。"
      }
    }
  }
};
