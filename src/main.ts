import ollama, { type Message } from 'ollama';
import readline from 'readline';
// import { availableFunctions, tools } from './tools/index';

const model = 'xiuxian';

// 改为终端输入
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
interface MX extends Message {
  role: 'system' | 'user' | 'assistant' | 'tool';
}

let message: MX[] = [
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

    // 调用插件

    // const response = await ollama.chat({
    //   model: model,
    //   messages: message,
    //   tools
    // });

    // // Process function calls made by the model
    // if (response.message.tool_calls && response.message.tool_calls.length > 0) {
    //   message.push(response.message as MX);
    //   for (const tool of response.message.tool_calls) {
    //     const functionToCall =
    //       availableFunctions[tool.function.name as keyof typeof availableFunctions];
    //     const functionResponse = functionToCall(tool.function.arguments as any);
    //     // Add function response to the conversation
    //     message.push({
    //       role: 'tool',
    //       content: functionResponse
    //     });
    //   }
    // }
    const finalResponse = await ollama.chat({
      model,
      messages: message,
      stream: true
    });
    console.log('\n修仙:');

    let msg = '';
    for await (const part of finalResponse) {
      msg += part.message.content;
      process.stdout.write(part.message.content);
    }

    console.log('\n');

    message.push({
      role: 'assistant',
      content: msg
    });

    return main();
  });
}

main();
