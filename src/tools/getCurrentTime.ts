import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale('zh-cn');
dayjs.tz.setDefault('Asia/Shanghai');
//  获取当前时间插件
const tools = [
  {
    type: 'function',
    function: {
      name: 'get_current_time',
      description: 'Get the current time',
      parameters: {
        type: 'object',
        properties: {
          timezone: {
            type: 'string',
            description: 'time zone'
          }
        },
        required: ['timezone']
      }
    }
  }
];
function getCurrentTime(args: { timezone: string }): string {
  const time = dayjs(new Date()).tz(args.timezone).format('YYYY-MM-DD HH:mm:ss Z');
  console.log('调用插件', 'get_current_time', args, time);
  // 输出 当前时间
  return time;
}

const availableFunctions = {
  get_current_time: getCurrentTime
};

export default { tools, availableFunctions };
