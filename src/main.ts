import ollama from 'ollama';
import readline from 'readline';

interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
  images?: Uint8Array[] | string[];
}

// 改为终端输入
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let message: Message[] = [
  // 初始化
  {
    role: 'system',
    content: `你是一个修仙游戏,请根据以下内容生成选项,让用户扮演名叫风凡的少年,开启修仙人生。
'少年对面站着一位中年人，这位中年人两鬓略有些斑白，穿着一套青衫。尽管衣衫有些脱色，但却洗得很干净。'
'风凡答应了一声，将地上的东西都收了起来，然后端坐在地上，开始默想绿简的样子。他的脑海中出现了一片片字迹，这正是五行玄蒙经的内容。'`
  }
];

async function main() {
  rl.question('请输入：', async question => {
    message.push({
      role: 'user',
      content: question
    });
    const response = await ollama.chat({
      model: 'xiuxian',
      // model: 'qwen2.5:latest',
      messages: message,
      stream: true
    });
    console.log('修仙:');

    let msg = '';
    for await (const part of response) {
      msg += part.message.content;
      process.stdout.write(part.message.content);
    }

    console.log('\n');

    message.push({
      role: 'assistant',
      content: msg
    });
    // rl.close();
    // 循环
    main();
  });
}

main();
