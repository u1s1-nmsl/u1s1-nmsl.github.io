function* chunk(length){
  for(let i = 0; i < length; i++){
    yield i
  }
}

class RandomChar {
  #max
  #words
  #cur
  constructor(max, words){
    this.#max = max
    this.#words = words
    this.#cur = 0
  }
  
  #word(){
    return this.#words[Math.floor(Math.random() * this.#words.length)]
  }
  
  #next(){
    const diff = this.#max - this.#cur
    if (Math.random() * diff >= 1) {
        this.#cur += diff / this.#max
        return false
    }
    this.#cur = 0
    return true
  }
  
  restart(){
    this.#cur = 0
  }
  
  after(str){
    if(this.#next()){
      return str + this.#word()
    }
    return str
  }
}

const chars = new RandomChar(12, ['，', '。', '？', '！', '…', '~', '：', '、'])
const url = './rmw_utf8.wasm'
const wasm = await (async(url) => {
  const response = await fetch(new URL(url, import.meta.url).href)
  if (!response.ok) {
      throw new Error(`Failed to fetch WASM file: ${response.statusText}`)
  }
  const {instance: {exports}} = await WebAssembly.instantiateStreaming(response, {})
  return exports
})(url)

const encoder = new TextEncoder()
const decoder = new TextDecoder()

const table = new Map(Array.from('一丁七万丈三上下不与丑专且世丘丙业丛东丝丢两严丧个中丰串临丸丹为主丽举乃久么义之乌乎乏乐乒乓乔乖乘乙九乞也习乡书买乱乳了予争事二于亏云互五井亚些亡交亦产亩享京亭亮亲人亿什仁仅仆仇今介仍从仓仔他仗付仙代令以仪们仰件价任份仿企伍伏伐休众优伙会伞伟传伤伪伯估伴伶伸似但位低住体何余佛作你佣佩佳使侄例侍供依侦侧侨侮侵便促俊俗俘保信俩俭修俯俱倍倒倘候倚借倡倦债值倾假偏做停健偶偷偿傅傍储催傲傻像僚僵僻儿允元兄充兆先光克免兔党入全八公六兰共关兴兵其具典养兼兽内冈册再冒写军农冠冤冬冰冲决况冶冷冻净准凉减凑凝几凡凤凭凯凳凶出击刀刃分切刊刑划列刘则刚创初删判利别刮到制刷券刺刻剂剃削前剑剖剥剧剩剪副割劈力劝办功加务劣动助努劫励劲劳势勇勉勒勤勺勾勿匀包匆化北匙匠匪匹区医十千升午半华协单卖南博卜占卡卧卫印危即却卵卷卸厂厅历厉压厌厕厘厚原厦厨去县参又叉及友双反发叔取受变叙叛叠口古句另叨只叫召叮可台史右叶号司叹叼吃各合吉吊同名后吐向吓吗君吞否吧吨吩含听启吴吵吸吹吼呀呆呈告员呜呢周味呼命和咏咐咬咱咳咸咽哀品哄哈响哑哗哥哨哪哭哲唇唉唐唤售唯唱啄商啊啦喂善喇喉喊喘喜喝喷嗓嗽嘉嘱嘴器嚷嚼囊四回因团园困围固国图圆圈土圣在地场圾址均坊坏坐坑块坚坛坝坟坡坦垂垃垄型垒垦垫垮埋城域培基堂堆堡堤堪堵塌塑塔塘塞填境墓墙增墨壁壤士壮声壳壶处备复夏夕外多夜够大天太夫央失头夸夹夺奇奉奋奏奔奖套奥女奴奶奸她好如妄妇妈妖妙妥妨妹妻始姐姑姓委姜姥姨姻姿威娃娇娘娱婆婚婶嫁嫂嫌嫩子孔孕字存孙孝孟季孤学孩宁它宅宇守安宋完宏宗官宙定宜宝实审客宣室宪宫宰害宴宵家容宽宾宿寄密寇富寒察寨寸对寺寻导寿封射将尊小少尖尘尚尝尤就尸尺尼尽尾尿局层居屈届屋屑展属屠屡屯山屿岁岂岔岗岛岩岭岸峡峰崇崖崭川州巡工左巧巨巩差己已巴巷巾币市布帅帆师希帐帖帘帜帝带席帮常帽幅幕干平年并幸幻幼广庄庆床序库应底店庙府废度座庭康庸廉廊延建开异弃弄弊式弓引弟张弦弯弱弹强归当录形彩影役彻彼往征径待很律徐徒得御循微德心必忆忌忍志忘忙忠忧快念忽怀态怎怒怕怖怜思怠急性怨怪总恋恐恒恢恨恩恭息恰恳恶恼悄悉悔悟悠患悦您悬悲悼情惊惑惕惜惠惧惨惩惭惯惰想惹愁愈愉意愚感愤愧愿慈慌慎慕慢慧慨慰懂懒戏成我戒或战戚截戴户房所扁扇手才扎扑扒打扔托扛扣执扩扫扬扭扮扯扰扶批找承技抄把抓投抖抗折抚抛抢护报披抬抱抵抹押抽担拆拉拌拍拐拒拔拖拘招拜拢拣拥拦拨择括拳拴拼拾拿持挂指按挎挑挖挠挡挣挤挥挨挪振挺挽捆捉捎捏捐捕捞损捡换捧据捷掀授掉掌掏排掘掠探接控推掩揉描提插握揪揭援搁搂搅搏搜搞搬搭携摄摆摇摊摔摘摧摩摸撇撑撒撕撞撤播操擦攀支收改攻放政故效敌敏救教敞敢散敬数敲整文斑斗料斜斤斥斧斩断斯新方施旁旅旋族旗无既日旦旧旨早旬旱时旷旺昂昆昌明昏易星映春昨是昼显晃晋晌晒晓晕晚晨普景晴晶智暂暑暖暗暮暴曲更曾替最月有朋服朗望朝期木未末本术朱朴朵机朽杀杂权杆李杏材村杜束杠条来杨杯杰松板极构析枕林果枝枣枪枯架柄柏某染柔柜查柱柳柴柿标栋栏树栗校株样核根格栽桂桃框案桌桐桑档桥桨桶梁梅梢梦梨梯械梳检棉棋棍棒棕棚森棵椅植椒楚楼概榆榜榨榴槐槽模横樱橘橡欠次欢欣欧欲欺款歇歉歌止正此步武歪死歼殃殊残殖段殿毁毅母每毒比毕毙毛毫毯氏民气氧水永汁求汇汉汗江池污汤汪汽沃沈沉沙沟没沫河沸油治沾沿泄泉泊法泛泡波泥注泪泰泳泻泼泽洁洋洒洗洞津洪洲活洽派流浅浆浇浊测济浑浓浙浩浪浮浴海浸涂消涉涌涛涝润涨液淋淘淡深混淹添清渐渔渗渠渡渣温港渴游湖湾湿溉源溜溪滋滑滔滚满滤滥滨滩滴漂漆漏演漠漫潜潮澡激灌火灭灯灰灵灶灾灿炉炊炎炒炕炭炮炸点炼烂烈烘烛烟烤烦烧烫热焦焰然煌煎煤照煮熄熊熔熟燃燕燥爆爪爬爱父爷爸爹爽片版牌牙牛牢牧物牲牵特牺犁犬犯状犹狂狐狗狠狡独狭狮狱狸狼猎猛猜猪猫献猴猾率玉王玩环现玻珍珠班球理琴瑞璃瓜瓣瓦瓶甘甚甜生用甩田由甲申电男画畅界畏留畜略番疆疏疑疗疤疫疮疯疲疼疾病症痒痕痛痰瘦登白百皂的皆皇皮皱盆盈益盏盐监盒盖盗盘盛盟目盯盲直相盼盾省眉看真眠眨眯眼着睁睛睡督睬瞎瞒瞧矛知矩短矮石矿码砌砍研砖破础硬确碌碍碎碑碗碧碰磁磨示礼社祖祝神祥票祸禁福离禽禾秀私秃秆秋种科秒秘租秤秧秩积称移稀程稍税稠稳稻稼稿穗穴究穷空穿突窃窄窑窗窜窝立竖站竞竟章童竭端竹竿笋笑笔笛符笨第笼等筋筐筑筒答策筛筝筹签简算管箩箭箱篇篮籍米类粉粒粗粘粥粪粮粱精糊糕糖糟糠系素索紧紫累絮繁纠红纤约级纪纯纱纲纳纵纷纸纹纺纽线练组细织终绍经绑绒结绕绘给络绝绞统绢绣继绩绪续绳维绵绸绿缎缓编缘缝缠缩缴缸缺罐网罗罚罢罩罪置羊美羞羡群羽翁翅翠翻翼耀老考者而耍耐耕耗耳耻耽聋职联聚聪肃肆肉肌肚肝肠股肢肤肥肩肯育肺肾肿胀胁胃胆背胖胜胞胡胳胶胸能脂脆脉脊脏脑脖脚脱脸脾腊腐腔腥腰腹腾腿膀膊膏膛膜膝膨臂臣自臭至致舅舌舍舒舞舟航般舰舱船艇艘良艰色艳艺节芒芝芦芬花芳芹芽苍苏苗若苦英苹茂范茄茅茎茧茫茶草荐荒荡荣药荷莫莲获菊菌菜菠萄萌萍萝营落著葛葡董葬葱葵蒙蒜蒸蓄蓝蓬蔑蔬蔽蕉薄薪薯藏虎虏虑虚虫虹虽虾蚀蚁蚂蚊蚕蛇蛋蛙蛛蛮蛾蜂蜓蜘蜜蜡蜻蝇蝴蝶融螺蠢血行衔街衡衣补表衫衬衰袄袋袍袖袜被袭裁裂装裕裙裤裳裹西要覆见观规视览觉角解触').map((i, j) => [[i.charCodeAt(0), j], [j, i.charCodeAt(0)]]).flat())

const {min, max} = table.keys()
    .filter(i => i > table.size)
    .reduce((a, b) => (a.min = Math.min(a.min, b), a.max = Math.max(a.max, b), a), {min: Number.MAX_VALUE, max: Number.MIN_VALUE})

const mm_encode = bytes => {
  chars.restart()
  return chunk(Math.ceil(bytes.length / 11))
    // 按照每11个元素一组拆分
    .map(i => bytes.slice(i * 11, (i + 1) * 11))
    // 整合为一个大数字
    .map(values => [
      values.values().map(i => BigInt(i)).reduce((a, b) => (a << 8n) | b, 0n),
      values.length * 8
    ])
    // 拆分大数字
    .map(([value, length]) => [
      // 计算拆分次数
      chunk(Math.ceil(length / 11))
        // 计算大数保留位数
        .map(i => length - i * 11)
        // 计算大数左侧需要屏蔽的值
        .map(i => [BigInt(i), BigInt(Math.min(11, i))])
        // 组合为右移次数和屏蔽值
        .map(([i, j]) => [i - j, (1n << j) - 1n])
        // 计算结果
        .map(([shift, mask]) => (value >> shift) & mask)
        .map(i => Number(i))
        .toArray(),
        length % 11
    ])
    // 处理末尾
    .map(([nums, rem]) => {
      if(0 < rem && rem < 4){
        // 当剩余有效位大于3时 补0最多补7位 解析的时候发现长度不够直接抛弃即可
        // 当剩余有效位小于4时 补0最少补8位 解析的时候会把这8位无效值解析出来 所以应当给一个标识让多补的8位抛弃掉
        nums[nums.length - 1] += 2048
      }
      return nums
    })
    .flatMap(i => i)
    .map(i => table.get(i))
    .map(i => String.fromCharCode(i))
    .map(i => chars.after(i))
    .toArray()
    .join('')
}

const mm_decode = string => {
  const bytes = chunk(string.length)
    .map(i => string.charCodeAt(i))
    // 限定有效值
    .filter(i => min <= i && i <= max)
    // 转换
    .map(i => table.get(i))
    .filter(Boolean)
    // 加上有效位 方便后续计算
    .map(i => [i, 11])
    .toArray()

  const iterable = chunk(Math.ceil(bytes.length / 8))
    // 按照每8个元素一组拆分
    .map(i => bytes.slice(i * 8, (i + 1) * 8))
    // 整合为一个大数字
    .map(values => {
      // 原数组长度
      const length = Math.floor(Math.floor((values.length * 11 - (values.at(-1)[0] > 2047? 3: 0))) / 8)
      // 末尾偏移量
      const shift = values.length * 11 - length * 8
      // 处理末尾
      values[values.length - 1][1] -= shift
      // 拼接
      const value = values.values()
        .map(([v, s]) => [BigInt(v), BigInt(s)])
        .map(([v, s]) => [v & ((1n << s) - 1n), s])
        .reduce((a, [v, s]) => (a << s) | v, 0n)
      return [value, length]
    })
    // 拆分大数字
    .map(([value, length]) =>
      // 计算拆分次数
      chunk(length)
        // 计算大数保留位数
        .map(i => BigInt((length - i - 1) * 8))
        // 计算结果
        .map(shift => (value >> shift) & 2047n)
        .map(i => Number(i))
        .toArray()
    )
    .flatMap(i => i)
  return new Uint8Array(iterable)
}

const rmw_encode = string => {
  const {
    __wbindgen_add_to_stack_pointer: pointer,
    __wbindgen_malloc: malloc,
    __wbindgen_realloc: realloc,
    __wbindgen_free: free,
    memory,
    encode
  } = wasm

  try {
    const retptr = pointer(-16) // 调整栈指针
    // 拷贝字符串到 WASM 内存
    // 尝试优化，首先按字符串长度分配内存，如果不够再重新分配
    let ptr = malloc(string.length)
    const mem = new Uint8Array(memory.buffer)
    let offset = 0
    // 优先处理 ASCII 字符，因为它们只需要一个字节
    for (; offset < string.length; offset++) {
        const code = string.charCodeAt(offset)
        if (code > 0x7f) break // 遇到非 ASCII 字符则停止
        mem[ptr + offset] = code
    }
    if (offset !== string.length) {
        if (offset !== 0) {
            string = string.slice(offset) // 截取未处理的字符串部分
        }
        // 重新分配内存，因为 UTF-8 字符可能占用更多字节（最多3字节）
        const len = offset + string.length * 3
        ptr = realloc(ptr, string.length, len)
        const view = new Uint8Array(memory.buffer).subarray(ptr + offset, ptr + len)
        const ret = encoder.encodeInto(string, view) // 使用 encodeInto 更高效地编码
        offset += ret.written
    }

    encode(retptr, ptr, offset) // 调用 WASM 模块中的 encode 函数

    const i32 = new Int32Array(memory.buffer)
    const r0 = i32[retptr / 4 + 0]
    const r1 = i32[retptr / 4 + 1]

    const result = new Uint8Array(memory.buffer).subarray(r0 / 1, r0 / 1 + r1).slice()
    free(r0, r1 * 1) // 释放内存

    return result
  } finally {
    pointer(16) // 恢复栈指针
  }
}

const rmw_decode = string => {
  const {
    __wbindgen_add_to_stack_pointer: pointer,
    __wbindgen_malloc: malloc,
    __wbindgen_free: free,
    memory,
    decode
  } = wasm

  try {
    const retptr = pointer(-16) // 调整栈指针
    
    const ptr = malloc(string.length * 1) // 分配内存
    new Uint8Array(memory.buffer).set(string, ptr / 1) // 拷贝数据

    decode(retptr, ptr, string.length) // 调用 WASM 模块中的 decode 函数

    const i32 = new Int32Array(memory.buffer)
    const r0 = i32[retptr / 4 + 0]
    const r1 = i32[retptr / 4 + 1]

    const result = new Uint8Array(memory.buffer).subarray(r0 / 1, r0 / 1 + r1) // 从 WASM 内存读取结果并解码为字符串
    const res = decoder.decode(result)
    free(r0, r1) // 释放内存
    return res
  } finally {
    pointer(16) // 恢复栈指针
  }
}

const enc = string => mm_encode(rmw_encode(string))

const dec = string => rmw_decode(mm_decode(string))

export default {enc, dec}