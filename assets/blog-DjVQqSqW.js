import{i as e}from"./useTranslation-Ct2QHHW8.js";var t=e(`calendar`,[[`path`,{d:`M8 2v4`,key:`1cmpym`}],[`path`,{d:`M16 2v4`,key:`4m81vk`}],[`rect`,{width:`18`,height:`18`,x:`3`,y:`4`,rx:`2`,key:`1hopcy`}],[`path`,{d:`M3 10h18`,key:`8toen8`}]]),n=e(`clock`,[[`circle`,{cx:`12`,cy:`12`,r:`10`,key:`1mglay`}],[`path`,{d:`M12 6v6l4 2`,key:`mmk7yg`}]]),r={"integrate-ai-winforms":{id:`integrate-ai-winforms`,tags:[`AI`,`WinForms`,`C#`],image:`https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1200`,content:{vi:`## Bối cảnh

Trong quá trình bảo trì một hệ thống WinForms đồ sộ đã hơn 10 năm tuổi, tôi nhận được một yêu cầu khá thú vị: "Làm sao để nhân viên có thể tra cứu thông tin bằng ngôn ngữ tự nhiên thay vì phải nhớ hàng trăm mã số khách hàng?"

Thay vì đập đi xây lại toàn bộ hệ thống bằng công nghệ web mới, tôi quyết định **giữ nguyên kiến trúc cũ và nhúng trực tiếp một mô hình AI cục bộ (Local LLM) vào WinForms**.

## Tại sao lại là Local LLM?

Sử dụng OpenAI API hay Google Gemini API là cách dễ nhất. Tuy nhiên, do đặc thù ngành tài chính, toàn bộ dữ liệu nội bộ không được phép gửi ra ngoài Internet. Chúng tôi buộc phải chạy mô hình AI nội bộ.

### Công cụ sử dụng:
- **Ollama**: Để chạy mô hình Llama 3 8B.
- **C# HttpClient**: Tương tác với Ollama qua API Restful ở port \`11434\`.
- **System.Text.Json**: Parse luồng JSON streaming trả về.

## Kiến trúc triển khai

\`\`\`csharp
// Ví dụ một đoạn code C# gọi Ollama API
public async Task<string> ChatWithAI(string prompt) {
    var client = new HttpClient();
    var requestBody = new {
        model = "llama3",
        prompt = prompt,
        stream = false
    };
    
    var content = new StringContent(JsonSerializer.Serialize(requestBody), Encoding.UTF8, "application/json");
    var response = await client.PostAsync("http://localhost:11434/api/generate", content);
    
    // Parse và trả về kết quả...
}
\`\`\`

## Khó khăn gặp phải

1. **Giao diện bị treo (UI Freezing):** 
WinForms chạy trên luồng đơn (single thread). Ban đầu khi AI xử lý mất 5-10 giây, toàn bộ giao diện bị đơ. 
*Cách khắc phục:* Tôi áp dụng mô hình \`async/await\` kết hợp \`Task.Run\` và sử dụng \`IProgress<T>\` để cập nhật luồng chữ (streaming text) lên giao diện một cách mượt mà như ChatGPT.

2. **Dung lượng RAM quá lớn:**
LLM ngốn rất nhiều RAM. Tôi đã thử nghiệm chuyển sang model \`phi3:mini\` (chỉ khoảng 2.2GB) để đảm bảo các máy tính văn phòng cấu hình yếu vẫn có thể chạy được.

## Kết luận

Việc mang AI vào một nền tảng cũ như WinForms nghe có vẻ lạc lõng, nhưng nó chứng minh được rằng: Công nghệ không có rào cản về thời đại, quan trọng là cách chúng ta kết hợp chúng để giải quyết bài toán thực tế của doanh nghiệp.
`,en:`## Background

While maintaining a massive, 10-year-old WinForms system, I received an interesting request: "How can employees search for information using natural language instead of memorizing hundreds of customer codes?"

Instead of rewriting the entire system using modern web technologies, I decided to **keep the old architecture and embed a Local LLM directly into WinForms**.

## Why a Local LLM?

Using OpenAI or Google Gemini APIs would be the easiest approach. However, due to the strict nature of the finance industry, internal data cannot be sent over the Internet. We were required to run an internal AI model.

### Tools Used:
- **Ollama**: To run the Llama 3 8B model.
- **C# HttpClient**: To interact with Ollama via RESTful API on port \`11434\`.
- **System.Text.Json**: To parse the returned JSON streaming data.

## Deployment Architecture

\`\`\`csharp
// Example C# code to call Ollama API
public async Task<string> ChatWithAI(string prompt) {
    var client = new HttpClient();
    var requestBody = new {
        model = "llama3",
        prompt = prompt,
        stream = false
    };
    
    var content = new StringContent(JsonSerializer.Serialize(requestBody), Encoding.UTF8, "application/json");
    var response = await client.PostAsync("http://localhost:11434/api/generate", content);
    
    // Parse and return result...
}
\`\`\`

## Challenges Faced

1. **UI Freezing:** 
WinForms runs on a single thread. Initially, when the AI took 5-10 seconds to process, the entire interface froze. 
*Solution:* I applied the \`async/await\` pattern combined with \`Task.Run\` and used \`IProgress<T>\` to update the streaming text on the UI smoothly, just like ChatGPT.

2. **High RAM Consumption:**
LLMs consume a lot of RAM. I tested and switched to the \`phi3:mini\` model (only about 2.2GB) to ensure that low-spec office computers could still run it.

## Conclusion

Bringing AI into a legacy platform like WinForms might sound out of place, but it proves that: Technology has no era boundaries; what matters is how we combine them to solve real business problems.
`,ko:`## 배경

10년 된 거대한 WinForms 시스템을 유지보수하는 동안 흥미로운 요청을 받았습니다: "직원들이 수백 개의 고객 코드를 외우는 대신 자연어를 사용하여 정보를 검색할 수 있는 방법은 없을까요?"

최신 웹 기술을 사용하여 전체 시스템을 다시 작성하는 대신, **기존 아키텍처를 유지하면서 Local LLM을 WinForms에 직접 포함시키기로** 결정했습니다.

## 왜 Local LLM인가요?

OpenAI 또는 Google Gemini API를 사용하는 것이 가장 쉬운 접근 방식입니다. 그러나 금융 산업의 엄격한 특성상 내부 데이터는 인터넷을 통해 전송될 수 없습니다. 우리는 내부 AI 모델을 실행해야 했습니다.

### 사용된 도구:
- **Ollama**: Llama 3 8B 모델을 실행하기 위해.
- **C# HttpClient**: 포트 \`11434\`에서 RESTful API를 통해 Ollama와 상호 작용하기 위해.
- **System.Text.Json**: 반환된 JSON 스트리밍 데이터를 파싱하기 위해.

## 배포 아키텍처

\`\`\`csharp
// Ollama API를 호출하는 C# 코드 예제
public async Task<string> ChatWithAI(string prompt) {
    var client = new HttpClient();
    var requestBody = new {
        model = "llama3",
        prompt = prompt,
        stream = false
    };
    
    var content = new StringContent(JsonSerializer.Serialize(requestBody), Encoding.UTF8, "application/json");
    var response = await client.PostAsync("http://localhost:11434/api/generate", content);
    
    // 파싱 후 결과 반환...
}
\`\`\`

## 직면한 과제

1. **UI 멈춤 현상:** 
WinForms는 단일 스레드에서 실행됩니다. 처음에는 AI가 처리하는 데 5-10초가 걸려 전체 인터페이스가 멈췄습니다.
*해결책:* \`async/await\` 패턴을 \`Task.Run\`과 결합하여 적용하고 \`IProgress<T>\`를 사용하여 ChatGPT처럼 UI의 스트리밍 텍스트를 원활하게 업데이트했습니다.

2. **높은 RAM 소비:**
LLM은 많은 RAM을 소비합니다. 저사양 사무용 컴퓨터에서도 실행할 수 있도록 \`phi3:mini\` 모델(약 2.2GB)로 테스트하고 전환했습니다.

## 결론

WinForms와 같은 레거시 플랫폼에 AI를 도입하는 것이 어울리지 않게 들릴 수 있지만, 이는 기술에는 시대적 경계가 없으며 중요한 것은 실제 비즈니스 문제를 해결하기 위해 기술을 어떻게 결합하느냐에 달려 있음을 증명합니다.
`}},"using-ollama-locally":{id:`using-ollama-locally`,tags:[`LLM`,`Ollama`,`DevOps`],image:`https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200`,content:{vi:`## Giới thiệu

Với sự bùng nổ của AI, việc tích hợp ChatGPT vào ứng dụng đã trở nên quá phổ biến. Tuy nhiên, khi xây dựng các ứng dụng cần **bảo mật dữ liệu tuyệt đối**, việc gửi dữ liệu lên server của OpenAI là không được phép.

Đó là lúc **Ollama** tỏa sáng. Ollama cho phép bạn chạy các mô hình ngôn ngữ lớn (LLM) như Llama 3, Mistral, Gemma... trực tiếp trên máy tính cá nhân của mình.

## Hướng dẫn cài đặt

1. Tải và cài đặt Ollama từ trang chủ \`ollama.com\`.
2. Mở Terminal và chạy lệnh sau để kéo mô hình Llama 3 về máy:

\`\`\`bash
ollama run llama3
\`\`\`

Chỉ với một dòng lệnh, bạn đã có ngay một con AI chạy hoàn toàn offline trên máy tính của mình.

## Giao tiếp qua API

Ollama tự động mở một cổng HTTP tại \`localhost:11434\`. Bạn có thể dùng Postman hoặc bất kỳ ngôn ngữ lập trình nào để giao tiếp.

Ví dụ dùng Fetch API trong JavaScript:

\`\`\`javascript
const response = await fetch('http://localhost:11434/api/generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    model: 'llama3',
    prompt: 'Giải thích về React Hooks trong 1 câu ngắn gọn.',
    stream: false
  })
});

const data = await response.json();
console.log(data.response);
\`\`\`

## Đánh giá hiệu năng

- **Ưu điểm**: Miễn phí 100%, không giới hạn token, bảo mật dữ liệu an toàn tuyệt đối.
- **Nhược điểm**: Tốn nhiều tài nguyên phần cứng (Đòi hỏi GPU mạnh và dung lượng RAM lớn, ít nhất 8GB cho các model nhỏ).

## Ứng dụng thực tế

Trong dự án thực tập của mình, tôi đã sử dụng Ollama để chạy mô hình AI nhận diện ngôn ngữ tự nhiên từ người dùng, sau đó chuyển đổi thành câu lệnh SQL (Text-to-SQL) để truy xuất cơ sở dữ liệu nội bộ một cách an toàn.
`,en:`## Introduction

With the explosion of AI, integrating ChatGPT into applications has become incredibly popular. However, when building applications that require **absolute data privacy**, sending data to OpenAI's servers is not permitted.

That's where **Ollama** shines. Ollama allows you to run Large Language Models (LLMs) such as Llama 3, Mistral, and Gemma... directly on your personal computer.

## Installation Guide

1. Download and install Ollama from the official website \`ollama.com\`.
2. Open your Terminal and run the following command to pull the Llama 3 model to your machine:

\`\`\`bash
ollama run llama3
\`\`\`

With just a single command, you now have an AI running completely offline on your computer.

## Communicating via API

Ollama automatically opens an HTTP port at \`localhost:11434\`. You can use Postman or any programming language to communicate with it.

For example, using the Fetch API in JavaScript:

\`\`\`javascript
const response = await fetch('http://localhost:11434/api/generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    model: 'llama3',
    prompt: 'Explain React Hooks in one short sentence.',
    stream: false
  })
});

const data = await response.json();
console.log(data.response);
\`\`\`

## Performance Review

- **Pros**: 100% free, no token limits, absolutely secure data privacy.
- **Cons**: Consumes a lot of hardware resources (Requires a strong GPU and a large amount of RAM, at least 8GB for small models).

## Practical Application

During my internship project, I used Ollama to run an AI model that recognizes natural language from users, then converts it into SQL queries (Text-to-SQL) to securely retrieve internal database information.
`,ko:`## 소개

AI의 폭발적인 성장과 함께 ChatGPT를 애플리케이션에 통합하는 것이 매우 인기를 얻고 있습니다. 그러나 **절대적인 데이터 프라이버시**가 필요한 애플리케이션을 구축할 때 OpenAI의 서버로 데이터를 전송하는 것은 허용되지 않습니다.

바로 여기서 **Ollama**가 빛을 발합니다. Ollama를 사용하면 Llama 3, Mistral, Gemma와 같은 대규모 언어 모델(LLM)을 개인 컴퓨터에서 직접 실행할 수 있습니다.

## 설치 가이드

1. 공식 웹사이트 \`ollama.com\`에서 Ollama를 다운로드하여 설치합니다.
2. 터미널을 열고 다음 명령을 실행하여 Llama 3 모델을 컴퓨터로 가져옵니다:

\`\`\`bash
ollama run llama3
\`\`\`

단 하나의 명령어로 컴퓨터에서 완전히 오프라인으로 실행되는 AI를 갖게 되었습니다.

## API를 통한 통신

Ollama는 \`localhost:11434\`에 HTTP 포트를 자동으로 엽니다. Postman이나 프로그래밍 언어를 사용하여 통신할 수 있습니다.

예를 들어, JavaScript에서 Fetch API를 사용하는 경우:

\`\`\`javascript
const response = await fetch('http://localhost:11434/api/generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    model: 'llama3',
    prompt: 'React Hooks에 대해 한 문장으로 설명해 주세요.',
    stream: false
  })
});

const data = await response.json();
console.log(data.response);
\`\`\`

## 성능 평가

- **장점**: 100% 무료, 토큰 제한 없음, 절대적으로 안전한 데이터 프라이버시.
- **단점**: 많은 하드웨어 리소스를 소비합니다 (강력한 GPU와 대용량 RAM이 필요하며, 작은 모델의 경우 최소 8GB가 필요합니다).

## 실제 활용 사례

인턴십 프로젝트 중에 저는 사용자의 자연어를 인식하는 AI 모델을 실행하기 위해 Ollama를 사용한 후, 이를 SQL 쿼리(Text-to-SQL)로 변환하여 내부 데이터베이스 정보를 안전하게 검색할 수 있도록 했습니다.
`}}};export{n,t as r,r as t};