import { DimensionType, DimensionCNType } from "../interfaces/";

export const DIMENSION: DimensionType[] = [
  // "lore",
  // "emotion",
  // "goodwill",
  "action",
];
export const dimensionCN: DimensionCNType[] = ["知", "情", "意", "行"];

export const dimensionMap = {
  lore: {
    intro:
      "知，即道德认识，使人们对道德规范及其意义的理解和掌握;对是非、善恶、美丑的认识、判断和评价，以及在此基础上形成的道德识辨能力，也是人们确定对客观事物的主观态度和行为准则的内在依据。",
    remark: "请选出下列选项中不是关于友善的：（4×5=20分）",
  },
  emotion: {
    intro:
      "情，即道德情感，使人们对社会道德思想和人们行为的爱憎、好恶等情绪态度，是进行道德判断时引发的一种内心体验。",
    remark:
      "本题为打分题，请根据自己的情感体验符合程度进行自我打分，1分为基本没有相关感受,5分为感受非常强烈。（4×5=20分）",
  },
  goodwill: {
    intro:
      "意，即道德意志，是为实现道德行为所作的自觉努力，使人们通过理智权衡，解决思想道德生活中的内心矛盾与支配行为的力量。",
    remark:
      "本题采用李克特量表五点计分法，从一个极端到另一个极端，非常不同意（1分）、比较不同意（2分）、一般（3分）、比较同意（4分）、非常同意（5分）。（4×5=20分）",
  },
  action: {
    intro:
      "行，即道德行为，使人们在行动上对他人、社会和自然所做出的行为反应，是人的内在的道德认识和情感的外部行为外部表现，是衡量人们品德的重要标志。",
    remark:
      "四、曾经有这样一个故事，太阳和北风争论究竟哪个更有力量。他们看到一位穿着棉衣的老人就打赌，说谁能够让老人把外套脱下来，就承认谁的力量大。北风使劲的向老人吹去，想把老人的外套吹下来，可是他越吹老人把外套裹得越紧，北风吹累了，只好认输。太阳从云的背后走出来，将温暖的阳光撒在老人身上，没多久，老人就出汗了，并把外套脱了下来。太阳笑着对北风说：温暖比强硬往往能达到更好的效果。这个寓言故事很好地证明了友善力量的强大，也说明了社会为什么需要友善的价值理念。而身为新时代的一名大学生，我们也很有必要将友善的价值观力量熔铸进我们的日常生活之中，在下列的一些事情之中，做过的积累1分，未做过的不计分。看看你能得多少分？（1×40=40）",
  },
};
