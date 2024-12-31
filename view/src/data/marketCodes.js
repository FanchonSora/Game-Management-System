// src/data/marketCodes.js

const marketCodes = {
  featuredCodes: [
    {
      id: 1,
      title: "React Router v6",
      category: "Package", // hoặc "Library"
      tags: ["JavaScript", "React"],
      description:
        "Thư viện giúp quản lý routing cho ứng dụng React, hỗ trợ Nested Routes, Lazy Loading và nhiều tính năng mới.",
      codeSnippets: {
        JavaScript: `// Demo cách sử dụng React Router v6
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import About from "./About";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;`,
      },
      // Thêm hướng dẫn cài đặt / triển khai
      howToImplement: `
1. Cài đặt package: \`npm install react-router-dom\`
2. Tạo file routes (VD: \`App.js\`) như ví dụ code.
3. Đảm bảo bọc <BrowserRouter> xung quanh <Routes>.
4. Thay đổi path, component tuỳ theo cấu trúc ứng dụng của bạn.
`,
      image: "/code/reactrouter.jpg",
      price: "Free",
    },
    {
      id: 2,
      title: "Styled Components",
      category: "Package",
      tags: ["JavaScript", "CSS"],
      description:
        "Thư viện CSS-in-JS cho phép viết CSS ngay trong file JS, dễ dàng tái sử dụng và tùy biến.",
      codeSnippets: {
        JavaScript: `// Ví dụ Styled Components
import styled from "styled-components";

const Button = styled.button\`
  background: palevioletred;
  border-radius: 3px;
  border: none;
  color: white;
  padding: 0.5rem 1rem;
\`;

function App() {
  return <Button>Click me</Button>;
}

export default App;`,
      },
      howToImplement: `
1. Cài đặt: \`npm install styled-components\`
2. Import \`styled\` từ \`styled-components\`.
3. Tạo các styled-components (VD: \`Button\`, \`Container\`) như trong ví dụ.
4. Sử dụng chúng như các React component bình thường.
`,
      image: "/code/styled-components.png",
      price: "Free",
    },
    {
      id: 3,
      title: "Redux Toolkit",
      category: "Package",
      tags: ["JavaScript", "React"],
      description:
        "Bộ công cụ chính thức từ Redux, giúp tạo store, reducer, action... dễ dàng hơn, giảm boilerplate code.",
      codeSnippets: {
        JavaScript: `// Ví dụ cấu hình Redux Toolkit
import { configureStore, createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: { value: 0 },
  reducers: {
    increment: (state) => { state.value += 1; },
    decrement: (state) => { state.value -= 1; }
  }
});

export const { increment, decrement } = counterSlice.actions;

const store = configureStore({
  reducer: {
    counter: counterSlice.reducer
  }
});

export default store;`,
      },
      howToImplement: `
1. Cài đặt: \`npm install @reduxjs/toolkit react-redux\`
2. Tạo \`slice\` với \`createSlice\`.
3. Tạo store với \`configureStore\`.
4. Kết nối React app với store qua \`<Provider>\`.
5. Dispatch action qua hooks \`useDispatch\` và lấy state qua \`useSelector\`.
`,
      image: "/code/redux-toolkit.jpg",
      price: "Free",
    },
    {
      id: 4,
      title: "Next.js 13",
      category: "Project",
      tags: ["JavaScript", "React", "TypeScript"],
      description:
        "Framework React hỗ trợ SSR, ISR và nhiều tính năng mới như App Directory (từ Next.js 13).",
      codeSnippets: {
        JavaScript: `// Ví dụ cấu trúc file Next.js 13
// app/page.js
export default function HomePage() {
  return <h1>Welcome to Next.js 13!</h1>;
}`,
      },
      howToImplement: `
1. Cài đặt: \`npx create-next-app@latest\` và chọn phiên bản 13.
2. Sử dụng thư mục \`app/\` để tạo page \`page.js\`.
3. Tận dụng tính năng Server Components, Static/ISR/SSR.
4. Triển khai lên Vercel hoặc hosting tuỳ ý.
`,
      image: "/code/nextjs.jpg",
      // Đổi thành trả phí
      price: "$9.99",
    },
    {
      id: 5,
      title: "TypeScript Basics",
      category: "Function",
      tags: ["TypeScript"],
      description:
        "Các khái niệm cơ bản về TypeScript: type, interface, generics, modules...",
      codeSnippets: {
        TypeScript: `// Ví dụ TypeScript cơ bản
function greet(name: string): string {
  return "Hello " + name;
}

console.log(greet("World"));`,
      },
      howToImplement: `
1. Cài đặt: \`npm install typescript -D\`
2. Khởi tạo file \`tsconfig.json\`: \`npx tsc --init\`
3. Viết code .ts, sau đó biên dịch sang .js bằng \`npx tsc\`.
4. Sử dụng generics, interface, type aliases... tuỳ theo logic dự án.
`,
      image: "/code/typescript.jpg",
      // Đổi thành trả phí
      price: "$4.99",
    },
    {
      id: 6,
      title: "GraphQL Essentials",
      category: "Function",
      tags: ["JavaScript", "GraphQL"],
      description:
        "Ví dụ cơ bản về cách định nghĩa schema và query GraphQL, tích hợp với Node.js/Express.",
      codeSnippets: {
        JavaScript: `// Ví dụ GraphQL server với Apollo
const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql\`
  type Book {
    title: String
    author: String
  }

  type Query {
    books: [Book]
  }
\`;

const resolvers = {
  Query: {
    books: () => [
      { title: "GraphQL Guide", author: "Sora" },
      { title: "Learning GraphQL", author: "Lam" }
    ]
  }
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
  console.log(\`Server ready at \${url}\`);
});`,
      },
      howToImplement: `
1. Cài đặt Apollo Server: \`npm install apollo-server graphql\`
2. Định nghĩa \`typeDefs\` và \`resolvers\`.
3. Khởi tạo \`ApolloServer\` và lắng nghe cổng.
4. Kiểm tra GraphQL Playground tại \`http://localhost:4000\`.
`,
      image: "/code/graphql.png",
      price: "Free",
    },
  ],

  libraries: [
    {
      id: 7,
      title: "Lodash",
      category: "Package",
      tags: ["JavaScript"],
      description:
        "Thư viện tiện ích cho JavaScript, cung cấp nhiều hàm xử lý mảng, object, string, v.v.",
      codeSnippets: {
        JavaScript: `// Ví dụ Lodash
import _ from "lodash";

const arr = [1, 2, 3, 4];
console.log(_.shuffle(arr));`,
      },
      howToImplement: `
1. Cài đặt: \`npm install lodash\`
2. Import \`_\` từ \`lodash\`.
3. Sử dụng các hàm tiện ích (VD: \`_.shuffle\`, \`_.map\`, ...)
`,
      image: "/code/lodash.jpg",
      price: "Free",
      discount: "-100%",
    },
    {
      id: 8,
      title: "Axios",
      category: "Package",
      tags: ["JavaScript"],
      description:
        "Thư viện HTTP Client giúp call API dễ dàng, có hỗ trợ Promise và async/await.",
      codeSnippets: {
        JavaScript: `// Ví dụ Axios
import axios from "axios";

axios.get("https://jsonplaceholder.typicode.com/posts")
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });`,
      },
      howToImplement: `
1. Cài đặt: \`npm install axios\`
2. Import \`axios\`.
3. Sử dụng \`axios.get\` hoặc \`axios.post\`... tuỳ yêu cầu API.
4. Kết hợp async/await để code gọn gàng hơn.
`,
      image: "/code/axios.jpg",
      price: "Free",
      discount: "-100%",
    },
    {
      id: 9,
      title: "Moment.js",
      category: "Package",
      tags: ["JavaScript"],
      description:
        "Thư viện xử lý thời gian (date/time), hỗ trợ format, parse, validate, và nhiều tiện ích khác.",
      codeSnippets: {
        JavaScript: `// Ví dụ Moment.js
import moment from "moment";

const now = moment().format("YYYY-MM-DD HH:mm:ss");
console.log("Hiện tại là:", now);`,
      },
      howToImplement: `
1. Cài đặt: \`npm install moment\`
2. Import \`moment\`.
3. Format, parse date/time theo nhu cầu (format string, timezone...).
4. Lưu ý Moment.js khuyến khích chuyển sang day.js cho project mới (tuỳ ý).
`,
      image: "/code/moment.png",
      price: "Free",
      discount: "-100%",
    },
    {
      id: 10,
      title: "D3.js",
      category: "Package",
      tags: ["JavaScript"],
      description:
        "Thư viện visualization mạnh mẽ, tạo các biểu đồ, map, data-driven document.",
      codeSnippets: {
        JavaScript: `// Ví dụ D3.js
import * as d3 from "d3";

const data = [10, 20, 30, 40];
d3.select("body")
  .selectAll("div")
  .data(data)
  .enter()
  .append("div")
  .style("width", d => d*10 + "px")
  .style("background", "steelblue")
  .style("margin", "5px")
  .text(d => d);`,
      },
      howToImplement: `
1. Cài đặt: \`npm install d3\`
2. Import \`d3\` (VD: \`import * as d3 from "d3";\`)
3. Tạo các selection và bind data.
4. D3 cung cấp nhiều hàm vẽ chart (scale, axis, shape...), bạn tuỳ biến thêm.
`,
      image: "/code/d3.png",
      price: "Free",
      discount: "-100%",
    },
  ],

  snippets: [
    {
      id: 11,
      title: "Debounce Function",
      category: "Function",
      tags: ["JavaScript"],
      description:
        "Snippet debounce giúp giới hạn tần suất thực thi 1 hàm khi sự kiện diễn ra liên tục.",
      codeSnippets: {
        JavaScript: `// Debounce snippet
function debounce(func, wait) {
  let timeout;
  return function(...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}

// Usage:
window.addEventListener("resize", debounce(() => {
  console.log("Window resized!");
}, 500));`,
      },
      howToImplement: `
1. Copy hàm \`debounce\` vào code của bạn.
2. Truyền hàm cần debounce và thời gian (ms) vào.
3. Kết hợp với các event thường xuyên như \`scroll\`, \`resize\`.
4. Kiểm tra console/log để thấy hàm không bị gọi quá dồn dập.
`,
      image: "/code/debounce.jpg",
      price: "Free",
      discount: "-100%",
    },
    {
      id: 12,
      title: "Throttling Technique",
      category: "Function",
      tags: ["JavaScript"],
      description:
        "Snippet throttle giúp hạn chế tần suất thực thi hàm theo khoảng thời gian nhất định.",
      codeSnippets: {
        JavaScript: `// Throttle snippet
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Usage:
window.addEventListener("scroll", throttle(() => {
  console.log("Scrolling...");
}, 200));`,
      },
      howToImplement: `
1. Copy hàm \`throttle\` vào code của bạn.
2. Truyền hàm cần throttle và thời gian (ms) vào.
3. Dùng cho event \`scroll\`, \`mousemove\`... để tránh gây lag.
4. Tối ưu hiệu năng tốt hơn debounce trong một số trường hợp.
`,
      image: "/code/throttle.png",
      price: "Free",
      discount: "-100%",
    },
    {
      id: 13,
      title: "Responsive Grid",
      category: "Function",
      tags: ["CSS", "HTML"],
      description:
        "Snippet CSS Grid đơn giản để tạo layout responsive cho website.",
      codeSnippets: {
        CSS: `/* CSS Grid Responsive */
.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.item {
  background: #eee;
  padding: 10px;
}`,
      },
      howToImplement: `
1. Tạo container với display: grid.
2. Sử dụng \`auto-fit\` + \`minmax\` để tự động co giãn cột.
3. Thay đổi giá trị gap, minmax cho phù hợp layout.
4. Test trên mobile, tablet, desktop.
`,
      image: "/code/grid.jpg",
      price: "Free",
      discount: "-100%",
    },
    {
      id: 14,
      title: "API Request Handler",
      category: "Function",
      tags: ["JavaScript"],
      description:
        "Snippet xử lý request (GET, POST) với fetch, hỗ trợ header, error handling.",
      codeSnippets: {
        JavaScript: `// API Request Handler
async function request(url, options) {
  try {
    const response = await fetch(url, options);
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.json();
  } catch (err) {
    console.error("Fetch error:", err);
    throw err;
  }
}

// Usage:
request("https://jsonplaceholder.typicode.com/posts")
  .then(data => console.log(data))
  .catch(err => console.error(err));`,
      },
      howToImplement: `
1. Tạo hàm \`request\` như trên.
2. Gọi \`request(url, { method: 'POST', body: ... })\` cho post request.
3. Xử lý error trong \`catch\`.
4. Thay \`fetch\` bằng \`axios\` nếu muốn, nhưng cấu trúc tương tự.
`,
      image: "/code/api-handler.png",
      price: "Free",
      discount: "-100%",
    },
  ],

  tools: [
    {
      id: 15,
      title: "Webpack Configuration",
      category: "Package",
      tags: ["JavaScript", "Webpack"],
      description:
        "Cấu hình Webpack cơ bản, bao gồm entry, output, loader, plugin.",
      codeSnippets: {
        JavaScript: `// webpack.config.js cơ bản
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      { 
        test: /\\.js$/, 
        exclude: /node_modules/, 
        use: { loader: 'babel-loader' } 
      },
      {
        test: /\\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
};`,
      },
      howToImplement: `
1. Tạo file \`webpack.config.js\` như trên.
2. Cài \`babel-loader\`, \`style-loader\`, \`css-loader\`, v.v.
3. Trong package.json, thêm script: \`"build": "webpack --config webpack.config.js"\`.
4. Chạy \`npm run build\` để bundle project.
`,
      image: "/code/webpack.png",
      price: "Free",
      discount: "-100%",
    },
    {
      id: 16,
      title: "Babel Setup",
      category: "Package",
      tags: ["JavaScript", "Babel"],
      description:
        "Cấu hình Babel để transpile ES6/ES7 sang ES5, hỗ trợ preset-env, plugin.",
      codeSnippets: {
        JavaScript: `// .babelrc hoặc babel.config.json
{
  "presets": ["@babel/preset-env", "@babel/preset-react"],
  "plugins": []
}

// Chạy lệnh:
// npx babel src --out-dir dist
`,
      },
      howToImplement: `
1. Cài đặt: \`npm install --save-dev @babel/core @babel/cli @babel/preset-env @babel/preset-react\`
2. Tạo file \`.babelrc\` hoặc \`babel.config.json\`.
3. Thêm script build Babel vào package.json.
4. Biên dịch code: \`npx babel src --out-dir dist\`.
`,
      image: "/code/babel.png",
      price: "$5.67",
      discount: "-100%",
    },
    {
      id: 17,
      title: "ESLint Rules",
      category: "Package",
      tags: ["JavaScript", "ESLint"],
      description:
        "Cấu hình ESLint cơ bản, tự động phát hiện bug và style errors.",
      codeSnippets: {
        JavaScript: `// .eslintrc.js
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "no-unused-vars": "warn",
    "react/prop-types": "off",
  },
};`,
      },
      howToImplement: `
1. Cài đặt: \`npm install --save-dev eslint\`
2. Tạo file \`.eslintrc.js\` như trên hoặc sử dụng \`eslint --init\`.
3. Thêm script \`"lint": "eslint ."\` vào package.json.
4. Chạy \`npm run lint\` để kiểm tra lỗi code.
`,
      image: "/code/eslint.jpg",
      price: "Free",
      discount: "-100%",
    },
    {
      id: 18,
      title: "Prettier Formatting",
      category: "Package",
      tags: ["JavaScript", "Prettier"],
      description:
        "Cấu hình Prettier cho code formatting nhất quán (dấu chấm phẩy, ngoặc kép, thụt lề...).",
      codeSnippets: {
        JavaScript: `// .prettierrc
{
  "semi": true,
  "singleQuote": false,
  "tabWidth": 2,
  "trailingComma": "es5"
}`,
      },
      howToImplement: `
1. Cài đặt: \`npm install --save-dev prettier\`
2. Tạo file \`.prettierrc\` như ví dụ trên.
3. Thêm script \`"format": "prettier --write ."\`.
4. Chạy \`npm run format\` để tự động format code.
`,
      image: "/code/prettier.jpg",
      price: "$4.00",
      discount: "-100%",
    },
  ],
};

export default marketCodes;
