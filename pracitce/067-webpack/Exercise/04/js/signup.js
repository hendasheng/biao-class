
import { open } from './base';

if (open) {
    document.body.innerHTML = `
                                <h1>欢迎入坑</h1>
                                `;
} else {
    document.body.innerHTML = `
                                <h1>暂不接受注册</h1>
                                `;
};