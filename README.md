What is the difference between var, let, and const?

Ans: var: old JavaScript variable, function scoped, re-declare করা যায়।

let : block scoped, value change করা যায় কিন্তু same scope এ আবার declare করা যায় না।

const : block scoped, declare করার পরে value change করা যায় না।
What is the spread operator (...)?

Ans: ... use হয় array বা object এর elements spread / copy করার জন্য
What is the difference between map(), filter(), and forEach()?

Ans: map() : array এর প্রতিটা element নিয়ে new array return করে।

filter() : condition অনুযায়ী selected elements দিয়ে new array return করে।

forEach() : শুধু loop করে, কিছু return করে না।
What is an arrow function?

Ans: ES6 এ আসা shorter function syntax।
What are template literals?

Ans: Backtick ব্যবহার করে string লিখা হয় এবং ${} দিয়ে variable use করা যায়।

# Assignment-05: GitHub Issues Tracker

### **API Endpoints:**

### **All Issues:**

- https://phi-lab-server.vercel.app/api/v1/lab/issues

### **Single Issue:**

- https://phi-lab-server.vercel.app/api/v1/lab/issue/{id}

- Example: https://phi-lab-server.vercel.app/api/v1/lab/issue/33

### **Search Issue:** https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q={searchText}

- Example: https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=notifications

---
