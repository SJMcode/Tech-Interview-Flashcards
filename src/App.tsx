import { useState } from 'react';
import { ChevronLeft, ChevronRight, RotateCcw, Check, X } from 'lucide-react';

const FlashcardApp = () => {
  const flashcards = {
    "JavaScript Basics": [
      {
        q: "What is a closure?",
        a: "A closure is when a function 'remembers' variables from its outer scope, even after that outer function has finished executing.\n\nExample:\nfunction outer() {\n  let count = 0;\n  return function inner() {\n    count++;\n    return count;\n  }\n}\nconst counter = outer();\ncounter(); // 1\ncounter(); // 2\n\ninner() still has access to count even though outer() finished."
      },
      {
        q: "Why does this code log 5 five times?\n\nfor (var i = 0; i < 5; i++) {\n  setTimeout(() => console.log(i), 100);\n}",
        a: "Because var is function-scoped, not block-scoped. All 5 timeouts share the SAME i variable. By the time they execute, the loop has finished and i equals 5.\n\nFix with let (block-scoped):\nfor (let i = 0; i < 5; i++) {\n  setTimeout(() => console.log(i), 100);\n}\n\nOr create a closure:\nfor (var i = 0; i < 5; i++) {\n  ((j) => setTimeout(() => console.log(j), 100))(i);\n}"
      },
      {
        q: "Explain the event loop in one sentence, then detail the process.",
        a: "Short: The event loop continuously checks if the call stack is empty, and if so, moves tasks from the callback queue to the call stack.\n\nDetailed process:\n1. Execute synchronous code (call stack)\n2. When call stack is empty, check microtask queue (Promises, queueMicrotask)\n3. Execute ALL microtasks\n4. Check macrotask queue (setTimeout, setInterval, I/O)\n5. Execute ONE macrotask\n6. Repeat from step 2\n\nKey: Microtasks have priority over macrotasks!"
      },
      {
        q: "What's the difference between == and ===?",
        a: "== does type coercion before comparing (loose equality)\n=== compares without type coercion (strict equality)\n\nExamples:\n5 == '5'  // true (string coerced to number)\n5 === '5' // false (different types)\n\n0 == false  // true\n0 === false // false\n\nNull quirk:\nnull == undefined  // true (special rule)\nnull === undefined // false"
      },
      {
        q: "Which array methods mutate the original array?",
        a: "MUTATING methods (change original):\n- push(), pop()\n- shift(), unshift()\n- splice()\n- sort(), reverse()\n- fill()\n\nNON-MUTATING (return new array):\n- map(), filter(), reduce()\n- slice()\n- concat()\n- spread [...arr]\n\nInterview tip: If asked to avoid mutations, use slice() first:\nconst sorted = [...arr].sort()"
      }
    ],
    "React Fundamentals": [
      {
        q: "Why can't you call hooks conditionally?",
        a: "React relies on the ORDER of hook calls to track state between renders. Each hook call gets a position in an internal array.\n\nIf you call hooks conditionally:\n- The order might change between renders\n- React associates state with the WRONG hook\n- Causes bugs and state corruption\n\nBad:\nif (condition) {\n  useState(0); // Order changes!\n}\n\nGood:\nconst [val, setVal] = useState(0);\nif (condition) {\n  setVal(5); // Use state conditionally\n}"
      },
      {
        q: "What's the stale closure problem in useEffect?",
        a: "When a function inside useEffect captures a variable's value at render time, but that variable changes later.\n\nExample:\nconst [count, setCount] = useState(0);\n\nuseEffect(() => {\n  const id = setInterval(() => {\n    console.log(count); // ALWAYS logs 0!\n  }, 1000);\n  return () => clearInterval(id);\n}, []); // Empty deps = closure captures initial count\n\nFix: Add count to deps, or use functional update:\nsetCount(c => c + 1)"
      },
      {
        q: "What happens if you forget the key prop in a list?",
        a: "React can't track which items changed, moved, or were deleted. It falls back to index-based reconciliation.\n\nProblems:\n- Component state gets mixed up when items reorder\n- Poor performance (unnecessary re-renders)\n- Form inputs keep wrong values\n\nBad key: index (breaks when list reorders)\nGood key: unique stable ID from data\n\nitems.map((item, i) => <Item key={i} />) ❌\nitems.map(item => <Item key={item.id} />) ✅"
      },
      {
        q: "When does useEffect run vs useLayoutEffect?",
        a: "useEffect:\n- Runs AFTER paint (asynchronous)\n- Doesn't block visual updates\n- Use for 99% of side effects (data fetching, subscriptions)\n\nuseLayoutEffect:\n- Runs BEFORE paint (synchronous)\n- Blocks visual updates until it completes\n- Use when you need to measure/modify DOM before user sees it\n\nExample: Tooltip positioning needs useLayoutEffect\n(measure element, position tooltip, THEN paint)"
      },
      {
        q: "Controlled vs uncontrolled components - when to use each?",
        a: "CONTROLLED: React state is source of truth\n<input value={val} onChange={e => setVal(e.target.value)} />\n\nPros: Validation, formatting, conditional logic\nCons: Re-renders on every keystroke\n\nUNCONTROLLED: DOM is source of truth\nconst ref = useRef();\n<input ref={ref} />\nconst val = ref.current.value;\n\nPros: Better performance, simpler for basic forms\nCons: Harder to validate, less React-like\n\nUse controlled for most cases. Use uncontrolled for performance-critical inputs or file uploads."
      }
    ],
    "HTTP Methods": [
      {
        q: "Which HTTP methods are idempotent and why does it matter?",
        a: "IDEMPOTENT methods: Multiple identical requests have the same effect as one request\n\n- GET ✅ (reading doesn't change state)\n- PUT ✅ (setting to value X multiple times = same result)\n- DELETE ✅ (deleting already-deleted = still deleted)\n- PATCH ❌ (depends on implementation)\n- POST ❌ (creates new resource each time)\n\nWhy it matters:\n- Safe to retry idempotent requests\n- Network can automatically retry on failure\n- Caching strategies differ"
      },
      {
        q: "PUT vs PATCH - when to use each?",
        a: "PUT: Replace entire resource\n- Send complete object\n- Idempotent\n- PUT /users/123 { name, email, age, ... }\n\nPATCH: Partial update\n- Send only changed fields\n- Not necessarily idempotent\n- PATCH /users/123 { email: 'new@email.com' }\n\nReal world:\n- Use PATCH for partial updates (more efficient)\n- Use PUT when you need to ensure full replacement\n- Many APIs only implement PUT for simplicity"
      },
      {
        q: "What makes an HTTP method 'safe'?",
        a: "SAFE = Read-only, doesn't modify server state\n\nSafe methods:\n- GET ✅\n- HEAD ✅ (like GET but no body)\n- OPTIONS ✅\n\nNot safe:\n- POST, PUT, PATCH, DELETE ❌\n\nWhy it matters:\n- Browsers can prefetch safe requests\n- Caches can store responses\n- Web crawlers can follow links\n- No CSRF protection needed\n\nNote: All safe methods are also idempotent, but not vice versa (DELETE is idempotent but not safe)"
      },
      {
        q: "What do these status codes mean: 200, 201, 204, 301, 304, 400, 401, 403, 404, 500?",
        a: "2xx Success:\n200 OK - Request succeeded\n201 Created - Resource created (POST)\n204 No Content - Success but no body (DELETE)\n\n3xx Redirection:\n301 Moved Permanently - Use new URL\n304 Not Modified - Cached version still valid\n\n4xx Client Error:\n400 Bad Request - Invalid syntax\n401 Unauthorized - Need authentication\n403 Forbidden - Authenticated but not allowed\n404 Not Found - Resource doesn't exist\n\n5xx Server Error:\n500 Internal Server Error - Server crashed"
      },
      {
        q: "Explain CORS - why does it exist and how does it work?",
        a: "CORS = Cross-Origin Resource Sharing\n\nWhy: Same-origin policy blocks JavaScript from reading responses from different origins (prevents malicious sites from stealing data)\n\nHow it works:\n1. Browser sends request with Origin header\n2. Server responds with Access-Control-Allow-Origin\n3. If origins match (or *), browser allows JavaScript to read response\n\nPreflight (for non-simple requests):\n1. Browser sends OPTIONS request first\n2. Server responds with allowed methods/headers\n3. If approved, browser sends actual request\n\nCommon issue: Server returns data but browser blocks it (check console, not network tab)"
      }
    ],
    "Browser Behavior": [
      {
        q: "Explain the critical rendering path in order.",
        a: "1. Parse HTML → DOM tree\n2. Parse CSS → CSSOM tree\n3. Combine DOM + CSSOM → Render tree\n4. Layout: Calculate positions and sizes\n5. Paint: Fill in pixels (text, colors, images)\n6. Composite: Layer together (for transforms, opacity)\n\nKey points:\n- CSS blocks rendering (must build CSSOM first)\n- JavaScript blocks parsing (unless async/defer)\n- Images don't block parsing, just trigger repaint when loaded"
      },
      {
        q: "What triggers a reflow vs a repaint?",
        a: "REFLOW (expensive - recalculates layout):\n- Changing size/position (width, height, padding, margin)\n- Adding/removing elements\n- Changing font size\n- Window resize\n- Reading layout properties (offsetHeight triggers flush!)\n\nREPAINT (cheaper - no layout change):\n- Color changes\n- Background changes\n- Visibility (not display)\n- Box shadow\n\nNEITHER (cheapest - uses compositor):\n- transform\n- opacity\n\nInterview gold: 'I'd use transform instead of left/top for animations to avoid reflows'"
      },
      {
        q: "Event capturing vs bubbling - what's the difference and when does each happen?",
        a: "Event flow has 3 phases:\n\n1. CAPTURING (top-down)\n  window → document → body → div → button\n\n2. TARGET\n  Event reaches actual element\n\n3. BUBBLING (bottom-up)\n  button → div → body → document → window\n\nBy default, listeners trigger during BUBBLING.\n\nTo use capturing:\nelement.addEventListener('click', handler, true);\n// or { capture: true }\n\nWhy it matters:\n- Event delegation relies on bubbling\n- stopPropagation() prevents further propagation\n- Some events don't bubble (focus, blur, load)"
      },
      {
        q: "localStorage vs sessionStorage vs cookies - when to use each?",
        a: "localStorage:\n- Persists forever (until cleared)\n- 5-10MB storage\n- Not sent to server\n- Use for: User preferences, cached data\n\nsessionStorage:\n- Cleared when tab closes\n- Same storage limit\n- Not sent to server\n- Use for: Form data, temporary state\n\ncookies:\n- Can set expiration\n- 4KB limit\n- SENT WITH EVERY REQUEST (bandwidth cost!)\n- Use for: Authentication tokens (httpOnly + secure)\n\nCommon mistake: Using cookies for large data (use localStorage instead)"
      },
      {
        q: "When does DOMContentLoaded fire vs load?",
        a: "DOMContentLoaded:\n- Fires when HTML is parsed and DOM is built\n- CSS and images DON'T need to load\n- JavaScript blocks it (unless async/defer)\n- Use for: Initializing app, attaching handlers\n\nload (window.onload):\n- Fires when EVERYTHING loaded (images, CSS, scripts)\n- Much later than DOMContentLoaded\n- Use for: Analytics, measuring page fully loaded\n\nModern approach:\n- Use defer on scripts (runs after DOM, before DOMContentLoaded)\n- Or put scripts at end of body\n\nQuick test:\ndocument.addEventListener('DOMContentLoaded', ...) // Fast\nwindow.addEventListener('load', ...) // Slow"
      }
    ]
  };

  const [currentCategory, setCurrentCategory] = useState("JavaScript Basics");
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [masteredCards, setMasteredCards] = useState({});

  const categories = Object.keys(flashcards);
  const currentCards = flashcards[currentCategory];
  const currentCard = currentCards[currentCardIndex];

  const nextCard = () => {
    if (currentCardIndex < currentCards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setShowAnswer(false);
    }
  };

  const prevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      setShowAnswer(false);
    }
  };

  const markMastered = (mastered) => {
    const key = `${currentCategory}-${currentCardIndex}`;
    setMasteredCards({ ...masteredCards, [key]: mastered });
    setTimeout(nextCard, 300);
  };

  const resetProgress = () => {
    setMasteredCards({});
    setCurrentCardIndex(0);
    setShowAnswer(false);
  };

  const getCurrentCardStatus = () => {
    const key = `${currentCategory}-${currentCardIndex}`;
    return masteredCards[key];
  };

  const getMasteredCount = () => {
    return Object.keys(masteredCards).filter(key =>
      key.startsWith(currentCategory) && masteredCards[key]
    ).length;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <h1 className="text-4xl font-bold text-white mb-2">Tech Interview Flashcards</h1>
          <p className="text-purple-300">Active recall for concepts that actually stick</p>
        </div>

        {/* Category Selector */}
        <div className="mb-6 flex flex-wrap gap-2 justify-center">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => {
                setCurrentCategory(cat);
                setCurrentCardIndex(0);
                setShowAnswer(false);
              }}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${currentCategory === cat
                ? 'bg-purple-500 text-white shadow-lg'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
            >
              {cat}
              <span className="ml-2 text-xs opacity-75">
                {getMasteredCount()}/{flashcards[cat].length}
              </span>
            </button>
          ))}
        </div>

        {/* Progress */}
        <div className="mb-4 text-center text-purple-300">
          Card {currentCardIndex + 1} of {currentCards.length}
        </div>

        {/* Flashcard */}
        <div
          className="bg-slate-800 rounded-2xl shadow-2xl p-8 min-h-[400px] mb-6 cursor-pointer relative overflow-hidden"
          onClick={() => setShowAnswer(!showAnswer)}
        >
          {/* Status indicator */}
          {getCurrentCardStatus() !== undefined && (
            <div className="absolute top-4 right-4">
              {getCurrentCardStatus() ? (
                <Check className="text-green-400" size={24} />
              ) : (
                <X className="text-red-400" size={24} />
              )}
            </div>
          )}

          <div className="text-sm text-purple-400 mb-4 font-medium">
            {showAnswer ? 'ANSWER' : 'QUESTION'}
          </div>

          <div className="text-white text-lg leading-relaxed whitespace-pre-wrap">
            {showAnswer ? currentCard.a : currentCard.q}
          </div>

          <div className="absolute bottom-4 right-4 text-slate-600 text-sm">
            Click to flip
          </div>
        </div>

        {/* Controls */}
        <div className="flex gap-4 items-center justify-center mb-4">
          <button
            onClick={prevCard}
            disabled={currentCardIndex === 0}
            className="p-3 bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 disabled:opacity-50 rounded-lg text-white transition-colors"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={() => setShowAnswer(!showAnswer)}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-500 rounded-lg text-white font-medium transition-colors"
          >
            {showAnswer ? 'Hide Answer' : 'Show Answer'}
          </button>

          <button
            onClick={nextCard}
            disabled={currentCardIndex === currentCards.length - 1}
            className="p-3 bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 disabled:opacity-50 rounded-lg text-white transition-colors"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Mastery buttons */}
        {showAnswer && (
          <div className="flex gap-4 justify-center mb-4">
            <button
              onClick={() => markMastered(false)}
              className="px-6 py-2 bg-red-600 hover:bg-red-500 rounded-lg text-white font-medium transition-colors flex items-center gap-2"
            >
              <X size={20} />
              Need Practice
            </button>
            <button
              onClick={() => markMastered(true)}
              className="px-6 py-2 bg-green-600 hover:bg-green-500 rounded-lg text-white font-medium transition-colors flex items-center gap-2"
            >
              <Check size={20} />
              Got It!
            </button>
          </div>
        )}

        {/* Reset button */}
        <div className="text-center">
          <button
            onClick={resetProgress}
            className="text-purple-400 hover:text-purple-300 text-sm flex items-center gap-2 mx-auto transition-colors"
          >
            <RotateCcw size={16} />
            Reset Progress
          </button>
        </div>

        {/* Tips */}
        <div className="mt-8 bg-slate-800 rounded-lg p-6 text-slate-300">
          <h3 className="text-purple-400 font-bold mb-3">How to Use These Cards</h3>
          <ul className="space-y-2 text-sm">
            <li>• Try to answer before flipping - that's where the learning happens</li>
            <li>• If you struggled, mark "Need Practice" even if you eventually got it</li>
            <li>• Review "Need Practice" cards more frequently</li>
            <li>• Connect concepts across categories - interviewers love that</li>
            <li>• Try explaining answers out loud to simulate interview pressure</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FlashcardApp;