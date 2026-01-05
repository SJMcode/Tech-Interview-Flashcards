import { useState } from 'react';
import { ChevronLeft, ChevronRight, RotateCcw, Check, X, Code2, Palette, FileJson, Globe, Atom } from 'lucide-react';

const FlashcardApp = () => {
  const flashcards = {
    HTML: {
      "Introduction": [
        {
          q: "What is HTML?",
          a: "HTML (HyperText Markup Language) is the standard markup language used to create web pages. It provides the structure and skeleton of a website.",
          code: "<!DOCTYPE html>\n<html>\n  <head>\n    <title>Page Title</title>\n  </head>\n  <body>\n    <h1>My First Heading</h1>\n    <p>My first paragraph.</p>\n  </body>\n</html>"
        },
        {
          q: "HTML vs CSS vs JavaScript",
          a: "- HTML: Structure & Content (Bones)\n- CSS: Presentation & Style (Skin/Clothing)\n- JavaScript: Interactivity & Logic (Muscles/Brain)",
          code: "<!-- HTML -->\n<button class=\"btn\">Click me</button>\n\n/* CSS */\n.btn { background: blue; color: white; }\n\n// JS\nconst btn = document.querySelector('.btn');\nbtn.addEventListener('click', () => alert('Hello!'));"
        },
        {
          q: "Identify the document type declaration.",
          a: "<!DOCTYPE html>\nIt tells the browser that this is an HTML5 document. It must be the very first line of code.",
          code: "<!DOCTYPE html>"
        }
      ],
      "Basics & Structure": [
        {
          q: "Block-level vs Inline elements",
          a: "Block-level:\n- Starts on a new line\n- Takes full width available\n- Examples: <div>, <p>, <h1>, <section>\n\nInline:\n- Stays on the same line\n- Takes only necessary width\n- Examples: <span>, <a>, <img>, <strong>",
          code: "<!-- Block -->\n<div>I am a block</div>\n<p>I am also a block</p>\n\n<!-- Inline -->\n<span>I am inline</span>\n<a href=\"#\">I am also inline</a>"
        },
        {
          q: "What are 'void' or 'empty' elements?",
          a: "Elements that don't have a closing tag because they don't hold content.\n\nExamples:\n<br>, <hr>, <img>, <input>, <link>, <meta>",
          code: "<br /> <!-- Break -->\n<hr /> <!-- Horizontal Rule -->\n<img src=\"image.jpg\" />\n<input type=\"text\" />"
        }
      ],
      "Text & Formatting": [
        {
          q: "<strong> vs <b> and <em> vs <i>",
          a: "<strong> & <em> are SEMANTIC:\n- <strong>: Important text (usually bold)\n- <em>: Emphasized text (usually italic)\n\n<b> & <i> are PRESENTATIONAL:\n- <b>: Bold text (no extra meaning)\n- <i>: Italic text (no extra meaning)\n\nAlways prefer semantic tags for accessibility.",
          code: "<p>\n  <strong>Warning:</strong> The stove is hot.\n  <em>Please be careful.</em>\n</p>"
        },
        {
          q: "How to display code snippets?",
          a: "Use <code> for inline code.\nUse <pre> for blocks of preformatted text (preserves whitespace).\n\nCombination:\n<pre><code>\n  const x = 10;\n</code></pre>",
          code: "<p>The <code>console.log()</code> function is useful.</p>\n\n<pre>\n  <code>\nfunction hello() {\n  return \"World\";\n}\n  </code>\n</pre>"
        }
      ],
      "Lists & Links": [
        {
          q: "Types of lists in HTML",
          a: "1. Unordered List (<ul>) -> Bullet points\n2. Ordered List (<ol>) -> Numbers/Letters\n3. Description List (<dl>) -> Terms (<dt>) and Descriptions (<dd>)",
          code: "<ul>\n  <li>Item 1</li>\n</ul>\n\n<ol>\n  <li>First</li>\n</ol>\n\n<dl>\n  <dt>HTML</dt>\n  <dd>Markup Language</dd>\n</dl>"
        },
        {
          q: "Absolute vs Relative URLs",
          a: "Absolute: Full web address (e.g., https://example.com/page)\nRelative: Path relative to current file (e.g., ./about.html or /images/logo.png)",
          code: "<a href=\"https://google.com\">Absolute</a>\n<a href=\"/contact\">Relative Root</a>\n<a href=\"../images/logo.png\">Relative Parent</a>"
        }
      ],
      "Multimedia": [
        {
          q: "Required attributes for <img>",
          a: "1. src (Source): Path to image\n2. alt (Alternative Text): Description for accessibility & SEO if image fails to load",
          code: "<img src=\"cat.jpg\" alt=\"A cute orange tabby cat sleeping\" />"
        },
        {
          q: "How to make images responsive?",
          a: "1. Use CSS: max-width: 100%; height: auto;\n2. Use 'srcset' and 'sizes' attributes to serve different files based on screen width.\n3. Use <picture> element for art direction (cropping/changing image completely).",
          code: "<img \n  src=\"small.jpg\" \n  srcset=\"small.jpg 500w, medium.jpg 1000w, large.jpg 1500w\" \n  alt=\"Responsive\" \n/>"
        }
      ],
      "Tables": [
        {
          q: "Table structure elements",
          a: "<table>: Wrapper\n<thead>: Header rows\n<tbody>: Body rows\n<tfoot>: Footer rows\n<tr>: Table Row\n<th>: Table Header Cell (Bold, Centered)\n<td>: Table Data Cell",
          code: "<table>\n  <thead>\n    <tr>\n      <th>Name</th>\n      <th>Age</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <td>Alice</td>\n      <td>25</td>\n    </tr>\n  </tbody>\n</table>"
        },
        {
          q: "How to merge cells?",
          a: "Use 'colspan' to merge columns horizontally.\nUse 'rowspan' to merge rows vertically.\n\n<td colspan='2'>Merges 2 cols</td>",
          code: "<table>\n  <tr>\n    <td colspan=\"2\">Spans 2 columns</td>\n  </tr>\n  <tr>\n    <td rowspan=\"2\">Spans 2 rows</td>\n    <td>Cell</td>\n  </tr>\n</table>"
        }
      ],
      "Forms": [
        {
          q: "Input types examples",
          a: "- text, password, email\n- number, range\n- checkbox (multiple), radio (single choice)\n- date, time, file, color\n- hidden",
          code: "<input type=\"email\" placeholder=\"Enter email\" />\n<input type=\"password\" />\n<input type=\"checkbox\" id=\"agree\" />\n<input type=\"date\" />"
        },
        {
          q: "Difference between <label> implicit vs explicit",
          a: "Explicit (Recommended):\n<label for='email'>Email</label>\n<input id='email' ... />\n\nImplicit (Wrapping):\n<label>Email <input ... /></label>",
          code: "<!-- Explicit connection (Best for A11y) -->\n<label for=\"username\">Username:</label>\n<input type=\"text\" id=\"username\" name=\"username\" />"
        }
      ],
      "Semantic HTML": [
        {
          q: "Why use Semantic HTML?",
          a: "1. Accessibility: Screen readers use it to navigate (e.g. 'Jump to Navigation').\n2. SEO: Helps search engines understand content importance.\n3. Maintainability: Easier for developers to read code.",
          code: "<!-- Bad -->\n<div class=\"header\">Header</div>\n<div class=\"nav\">Menu</div>\n\n<!-- Good -->\n<header>Header</header>\n<nav>Menu</nav>"
        },
        {
          q: "Common semantic landmarks",
          a: "<header>, <nav>, <main>, <footer>, <aside> (sidebar), <section>, <article>",
          code: "<body>\n  <header>...</header>\n  <main>\n    <article>...</article>\n    <aside>...</aside>\n  </main>\n  <footer>...</footer>\n</body>"
        }
      ],
      "Global Attributes": [
        {
          q: "id vs class",
          a: "id:\n- Unique identifier (ONE per page)\n- Used for anchor links (#section) & specific JS hooks\n\nclass:\n- Reusable identifier (MANY per page)\n- Used for styling multiple elements",
          code: "<div id=\"main-content\">Unique</div>\n\n<div class=\"card\">Reusable</div>\n<div class=\"card\">Reusable</div>"
        },
        {
          q: "What are data-* attributes?",
          a: "Allow you to store custom data private to the page or application.\n\n<div data-user-id='123' data-role='admin'>\n\nAccess in JS: element.dataset.userId",
          code: "<article data-id=\"101\" data-author=\"alice\">\n  ...\n</article>\n\n// JS\nconst article = document.querySelector('article');\nconsole.log(article.dataset.author); // \"alice\""
        }
      ],
      "HTML5 APIs": [
        {
          q: "localStorage vs sessionStorage",
          a: "localStorage: Persists until explicitly deleted. Shared across tabs/windows.\n\nsessionStorage: Cleared when tab/session closes. Specific to that tab.",
          code: "// Local (Forever)\nlocalStorage.setItem('theme', 'dark');\n\n// Session (Temporary)\nsessionStorage.setItem('tempToken', '123');"
        },
        {
          q: "How to get user location?",
          a: "navigator.geolocation.getCurrentPosition(success, error)\n\nRequires user permission (HTTPS only).",
          code: "navigator.geolocation.getCurrentPosition(\n  (pos) => console.log(pos.coords.latitude),\n  (err) => console.error(err)\n);"
        }
      ],
      "Graphics": [
        {
          q: "Canvas vs SVG",
          a: "Canvas:\n- Raster (pixels)\n- JS-drawn\n- Good for games, high frequency updates\n- Poor scalability\n\nSVG:\n- Vector (xml)\n- DOM elements\n- Good for logos, icons, charts\n- Perfect scalability",
          code: "<!-- SVG -->\n<svg width=\"100\" height=\"100\">\n  <circle cx=\"50\" cy=\"50\" r=\"40\" fill=\"red\" />\n</svg>\n\n<!-- Canvas -->\n<canvas id=\"myCanvas\"></canvas>\n<script>\n  const ctx = document.getElementById('myCanvas').getContext('2d');\n  ctx.fillRect(0, 0, 100, 100);\n</script>"
        }
      ],
      "Accessibility": [
        {
          q: "What is ARIA?",
          a: "Accessible Rich Internet Applications.\nAttributes (role, aria-label, aria-hidden) that supplement HTML to provide extra info to screen readers when native semantics fall short.",
          code: "<button aria-label=\"Close Menu\" onclick=\"closeMenu()\">\n  X\n</button>\n\n<div role=\"alert\">Error occurred</div>"
        },
        {
          q: "Alt text best practices",
          a: "- Be descriptive but concise.\n- Don't say 'image of...'.\n- Leave empty (alt='') if image is purely decorative.",
          code: "<!-- Good -->\n<img src=\"chart.png\" alt=\"Sales graph showing 20% growth in Q3\" />\n\n<!-- Decorative -->\n<img src=\"divider.png\" alt=\"\" />"
        }
      ],
      "SEO": [
        {
          q: "Important meta tags",
          a: "1. <title>: Critical for SEO & user tabs.\n2. description: Summary for search snippets.\n3. viewport: Essential for mobile responsiveness.\n4. charset: Character encoding (UTF-8).",
          code: "<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <meta name=\"description\" content=\"A free flashcard app for interviews\">\n  <title>Flashcards</title>\n</head>"
        }
      ],
      "Best Practices": [
        {
          q: "Performance tips",
          a: "- Use semantic HTML.\n- Lazy load images (loading='lazy').\n- Defer scripts (<script defer>).\n- Minimize DOM depth.\n- Preload critical assets.",
          code: "<img src=\"heavy.jpg\" loading=\"lazy\" alt=\"...\" />\n<script src=\"app.js\" defer></script>\n<link rel=\"preload\" href=\"font.woff2\" as=\"font\" />"
        }
      ]
    },
    CSS: {
      "Box Model": [
        {
          q: "What are the 4 parts of the Box Model?",
          a: "1. Content: The actual element content\n2. Padding: Space inside the border\n3. Border: The line wrap\n4. Margin: Space outside the border",
          code: ".box {\n  width: 100px; /* Content */\n  padding: 20px;\n  border: 1px solid black;\n  margin: 10px;\n}"
        },
        {
          q: "box-sizing: border-box vs content-box",
          a: "content-box (default): width = content only.\nborder-box: width = content + padding + border (Easier math).",
          code: "* {\n  box-sizing: border-box;\n}\n\n.box {\n  width: 100%; /* Includes padding/border */\n}"
        }
      ],
      "Selectors": [
        {
          q: "Specificity hierarchy",
          a: "1. !important (Highest)\n2. Inline styles\n3. IDs (#header)\n4. Classes/Pseudo-classes (.btn, :hover)\n5. Elements/Pseudo-elements (div, ::before)",
          code: "/* ID > Class */\n#nav { color: blue; }\n.nav { color: red; } /* Ignored */"
        },
        {
          q: "Combinators: >, +, ~",
          a: "> : Direct Child\n+ : Adjacent Sibling (Immediately following)\n~ : General Sibling (Anywhere following)",
          code: "div > p { color: red; } /* Only direct children */\nh1 + p { margin-top: 0; } /* p immediately after h1 */"
        }
      ],
      "Colors": [
        {
          q: "Different ways to define color",
          a: "Keywords (red)\nHex (#ff0000)\nRGB/RGBA (rgb(255, 0, 0))\nHSL/HSLA (hsl(360, 100%, 50%))\nLCH/OKLCH (modern gamuts)",
          code: "color: coral;\ncolor: #ff5733;\ncolor: rgba(0, 0, 0, 0.5); /* 50% opacity */"
        },
        {
          q: "What is currentColor?",
          a: "A variable referring to the current element's 'color' property. Useful for SVG fills or borders.",
          code: ".btn {\n  color: blue;\n  border: 1px solid currentColor; /* Becomes blue */\n}"
        }
      ],
      "Spacing": [
        {
          q: "margin vs padding",
          a: "Margin pushes neighbor elements away.\nPadding pushes internal content away from the border.",
          code: ".card {\n  margin: 20px; /* Space outside */\n  padding: 20px; /* Space inside */\n}"
        },
        {
          q: "What is margin collapse?",
          a: "When vertical margins of adjacent block elements combine into a single margin (equal to the largest one), instead of summing up.",
          code: "h1 { margin-bottom: 20px; }\np { margin-top: 10px; }\n/* Total space = 20px (not 30px) */"
        }
      ],
      "Pseudo Elements & Classes": [
        {
          q: "Difference between : and ::",
          a: ":pseudo-class (State) -> :hover, :focus, :nth-child\n::pseudo-element (Part) -> ::before, ::after, ::placeholder",
          code: "a:hover { color: purple; }\n\np::first-line {\n  font-weight: bold;\n}"
        }
      ],
      "Border and Outline": [
        {
          q: "border vs outline",
          a: "Border: Takes up space, affects layout.\nOutline: Doesn't take space, sits on top, often used for focus states.",
          code: ".btn:focus {\n  outline: 2px dashed blue;\n  outline-offset: 2px;\n}"
        }
      ],
      "Flexbox": [
        {
          q: "Centering a div with Flexbox",
          a: "justify-content: center (Horizontal)\nalign-items: center (Vertical)",
          code: ".parent {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 100vh;\n}"
        },
        {
          q: "flex-grow, flex-shrink, flex-basis",
          a: "grow: factor to grow if extra space\nshrink: factor to shrink if no space\nbasis: initial size",
          code: ".item {\n  /* grow | shrink | basis */\n  flex: 1 0 auto;\n}"
        }
      ],
      "Grid": [
        {
          q: "fr unit",
          a: "Fractional unit. Distributes available space proportionally.",
          code: ".grid {\n  display: grid;\n  grid-template-columns: 1fr 2fr; /* 1/3 and 2/3 */\n}"
        },
        {
          q: "minmax() function",
          a: "Defines a size range greater than or equal to min and less than or equal to max.",
          code: "grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));"
        }
      ],
      "Animations": [
        {
          q: "transition vs animation",
          a: "Transition: Smooth change from State A to B (triggered by hover/class).\nAnimation: Complex sequence with keyframes, loops, and no trigger needed.",
          code: "/* Transition */\n.btn { transition: transform 0.3s; }\n\n/* Animation */\n@keyframes slide {\n  from { left: 0; }\n  to { left: 100px; }\n}\n.box { animation: slide 2s infinite; }"
        }
      ],
      "Overflow & Scroll Snap": [
        {
          q: "Scroll Snap usage",
          a: "Enforces snap points when scrolling (like a carousel).",
          code: ".container {\n  scroll-snap-type: x mandatory;\n}\n.item {\n  scroll-snap-align: center;\n}"
        }
      ],
      "Text and Typography": [
        {
          q: "rem vs em",
          a: "rem: Relative to Root HTML font-size (usually 16px).\nem: Relative to Parent/Current element's font-size.",
          code: "html { font-size: 16px; }\np { font-size: 1.5rem; /* 24px */ }\nspan { font-size: 0.5em; /* Half of p (12px) */ }"
        }
      ],
      "Functions": [
        {
          q: "Common CSS functions",
          a: "calc(), var(), url(), rgb(), clamp(), min(), max()",
          code: "width: calc(100% - 20px);\ncolor: var(--main-bg);\nfont-size: clamp(16px, 5vw, 24px);"
        }
      ],
      "Units": [
        {
          q: "vh vs dvh vs svh",
          a: "vh: Viewport Height (static)\nsvh: Smallest Viewport Height (ignoring browser bars)\ndvh: Dynamic Viewport Height (adjusts as bars appear/disappear)",
          code: "height: 100dvh; /* Full screen even on mobile */"
        }
      ],
      "Position": [
        {
          q: "absolute vs relative vs fixed vs sticky",
          a: "relative: Offset from self.\nabsolute: Offset from nearest positioned ancestor.\nfixed: Offset from viewport (stays on scroll).\nsticky: Toggles between relative and fixed based on scroll.",
          code: ".parent { position: relative; }\n.child { \n  position: absolute; \n  top: 0; \n}"
        }
      ],
      "Box Shadow and Filter": [
        {
          q: "box-shadow syntax",
          a: "offset-x | offset-y | blur-radius | spread-radius | color",
          code: "box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);"
        }
      ],
      "Background and Images": [
        {
          q: "background-size values",
          a: "cover: Fills area, crops if needed.\ncontain: Shows full image, leaves empty space if needed.\nauto: Original size.",
          code: "background-size: cover;\nbackground-position: center;"
        }
      ],
      "Z-index": [
        {
          q: "Why isn't z-index working?",
          a: "Z-index only works on positioned elements (relative, absolute, fixed, sticky) or flex/grid children. It won't work on static (default) position.",
          code: ".box {\n  position: relative; /* Required! */\n  z-index: 10;\n}"
        }
      ],
      "Media Queries": [
        {
          q: "Mobile-first breakpoint example",
          a: "Define base styles for mobile, then use min-width for larger screens.",
          code: "/* Mobile */\n.container { width: 100%; }\n\n/* Desktop */\n@media (min-width: 768px) {\n  .container { width: 50%; }\n}"
        }
      ],
      "Browser Support": [
        {
          q: "What is a vendor prefix?",
          a: "Prefixes added by browser engines to support experimental features.",
          code: "-webkit-transform: rotate(45deg); /* Chrome/Safari */\n-ms-transform: rotate(45deg); /* IE */\ntransform: rotate(45deg); /* Standard */"
        }
      ],
      "CSS Architectures": [
        {
          q: "What is BEM?",
          a: "Block Element Modifier. A naming convention for classes to prevent style leaks.",
          code: ".block {}\n.block__element {}\n.block--modifier {}\n\n/* Example */\n.card {}\n.card__title {}\n.card--featured {}"
        }
      ],
      "Mobile First Design": [
        {
          q: "Why Mobile First?",
          a: "1. Performance: Loads minimal CSS for mobile.\n2. UX: Prioritizes content for smallest screens.\n3. Complexity: Simpler code (additive) vs Desktop-first (overriding).",
          code: "/* Default is mobile */\nfont-size: 16px;\n\n/* Additive for desktop */\n@media (min-width: 1024px) {\n  font-size: 20px;\n}"
        }
      ],
      "CSS Preprocessors": [
        {
          q: "Sass Features",
          a: "Nesting, Variables, Mixins, Modules.",
          code: "$primary: blue;\n\n.card {\n  color: $primary;\n  &:hover {\n    color: darkblue;\n  }\n}"
        }
      ]
    },
    JavaScript: {
      "Core Concepts": [
        {
          q: "What is a closure?",
          a: "A closure is when a function 'remembers' variables from its outer scope, even after that outer function has finished executing.\n\nExample:\nfunction outer() {\n  let count = 0;\n  return function inner() {\n    count++;\n    return count;\n  }\n}\n"
        },
        {
          q: "Event loop basics",
          a: "1. Call Stack (Sync code)\n2. Microtasks (Promises)\n3. Macrotasks (setTimeout)\n\nThe loop waits for Stack to be empty, then runs all Microtasks, then runs ONE Macrotask."
        },
        {
          q: "== vs ===",
          a: "== (Loose Equality): Performs type coercion (e.g., '5' == 5 is true).\n=== (Strict Equality): Checks value AND type (e.g., '5' === 5 is false).\n\nAlways use === to avoid bugs."
        }
      ]
    },
    Browser: {
      "Networking": [
        {
          q: "GET vs POST",
          a: "GET:\n- Requests data\n- Parameters in URL\n- Cachable\n- Idempotent\n\nPOST:\n- Submits data\n- Body contains data\n- Not cached by default\n- Not idempotent"
        },
        {
          q: "CORS",
          a: "Cross-Origin Resource Sharing.\nSecurity mechanism that blocks web pages from making requests to a different domain than the one that served the web page, unless the server explicitly allows it."
        }
      ],
      "Rendering": [
        {
          q: "Reflow vs Repaint",
          a: "Reflow (Layout): Calculating position/geometry. Expensive.\nRepaint: Changing visual styles (color, visibility). Cheaper.\n\nChanging width -> Reflow\nChanging background-color -> Repaint"
        }
      ]
    },
    React: {
      "Fundamentals": [
        {
          q: "useState vs useRef",
          a: "useState:\n- Triggers re-render when updated\n- Async updates\n\nuseRef:\n- Does NOT trigger re-render\n- Synchronous updates\n- Good for accessing DOM elements or storing mutable values that don't affect UI"
        },
        {
          q: "useEffect dependency array",
          a: "[] -> Runs once on mount\n[prop] -> Runs on mount + when prop changes\nNo array -> Runs on EVERY render (dangerous)\n\nReturn function -> Cleanup (runs before unmount or next effect)"
        }
      ]
    }
  };

  const [activeSelection, setActiveSelection] = useState({
    main: "JavaScript",
    sub: "Core Concepts"
  });

  // State for expanded categories in sidebar
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    "JavaScript": true
  });

  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [masteredCards, setMasteredCards] = useState<Record<string, boolean>>({});

  // @ts-ignore
  const currentCards = flashcards[activeSelection.main]?.[activeSelection.sub] || [];
  const currentCard = currentCards[currentCardIndex] || { q: '', a: '', code: '' };

  const nextCard = () => {
    if (currentCardIndex < currentCards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setShowAnswer(false);
      setShowCode(false);
    }
  };

  const prevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      setShowAnswer(false);
      setShowCode(false);
    }
  };

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const markMastered = (mastered: boolean) => {
    const key = `${activeSelection.main}-${activeSelection.sub}-${currentCardIndex}`;
    setMasteredCards({ ...masteredCards, [key]: mastered });
    setTimeout(nextCard, 300);
  };

  // @ts-ignore
  const resetProgress = () => {
    setMasteredCards({});
    setCurrentCardIndex(0);
    setShowAnswer(false);
    setShowCode(false);
  };

  const getCurrentCardStatus = () => {
    const key = `${activeSelection.main}-${activeSelection.sub}-${currentCardIndex}`;
    return masteredCards[key];
  };

  const getMasteredCount = (main: string, sub: string) => {
    const prefix = `${main}-${sub}-`;
    // @ts-ignore
    const category = flashcards[main];
    // @ts-ignore
    const subCategory = category?.[sub];

    if (!subCategory) return 0;

    return Object.keys(masteredCards).filter(key =>
      key.startsWith(prefix) && masteredCards[key]
    ).length;
  };

  const getIcon = (category: string) => {
    switch (category) {
      case 'HTML': return <Code2 size={18} />;
      case 'CSS': return <Palette size={18} />;
      case 'JavaScript': return <FileJson size={18} />;
      case 'Browser': return <Globe size={18} />;
      case 'React': return <Atom size={18} />;
      default: return <Code2 size={18} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex text-slate-100 font-sans">
      {/* Sidebar */}
      <div className="w-72 bg-slate-950/50 border-r border-slate-700/50 flex flex-col shrink-0 backdrop-blur-sm">
        <div className="p-6 border-b border-slate-800">
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Code2 className="text-purple-400" />
            Concepts
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {Object.entries(flashcards).map(([mainCategory, subCategories]) => (
            <div key={mainCategory} className="space-y-1">
              <button
                onClick={() => toggleCategory(mainCategory)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors hover:bg-slate-800/50 group ${expandedCategories[mainCategory] ? 'text-purple-300' : 'text-slate-400'
                  }`}
              >
                <div className="flex items-center gap-3 font-semibold text-sm">
                  <div className={`transition-colors ${expandedCategories[mainCategory] ? 'text-purple-400' : 'text-slate-500 group-hover:text-slate-400'}`}>
                    {getIcon(mainCategory)}
                  </div>
                  {mainCategory}
                </div>
                <ChevronRight
                  size={16}
                  className={`transition-transform duration-200 ${expandedCategories[mainCategory] ? 'rotate-90' : ''}`}
                />
              </button>

              {expandedCategories[mainCategory] && (
                <div className="flex flex-col gap-1 pl-4 border-l border-slate-800 ml-5 py-1">
                  {Object.keys(subCategories).map(sub => (
                    <button
                      key={sub}
                      onClick={() => {
                        setActiveSelection({ main: mainCategory, sub });
                        setCurrentCardIndex(0);
                        setShowAnswer(false);
                        setShowCode(false);
                      }}
                      className={`px-3 py-2 rounded-md text-sm font-medium text-left transition-all flex justify-between items-center group relative ${activeSelection.main === mainCategory && activeSelection.sub === sub
                        ? 'bg-purple-600/20 text-purple-300'
                        : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/30'
                        }`}
                    >
                      <span>{sub}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full transition-colors ${activeSelection.main === mainCategory && activeSelection.sub === sub
                        ? 'bg-purple-500/20 text-purple-300'
                        : 'bg-slate-900 border border-slate-800 text-slate-600 group-hover:border-slate-700'
                        }`}>
                        {getMasteredCount(mainCategory, sub)}/{(subCategories as any)[sub].length}
                      </span>
                      {activeSelection.main === mainCategory && activeSelection.sub === sub && (
                        <div className="absolute left-[-17px] top-1/2 -translate-y-1/2 w-1 h-4 bg-purple-500 rounded-r-full" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-2">Tech Interview Flashcards</h1>
            <p className="text-purple-300">Active recall for concepts that actually stick</p>
          </div>

          {/* Breadcrumbs */}
          <div className="text-center mb-2 text-sm text-slate-400 font-medium">
            <span className="text-slate-500">{activeSelection.main}</span>
            <ChevronRight className="inline mx-1 w-3 h-3" />
            <span className="text-purple-300">{activeSelection.sub}</span>
          </div>

          {/* Progress */}
          <div className="mb-6 text-center text-slate-500 text-xs tracking-widest uppercase">
            Card {currentCardIndex + 1} of {currentCards.length}
          </div>

          {/* Flashcard */}
          <div
            className="bg-slate-800/80 backdrop-blur border border-slate-700 rounded-2xl shadow-2xl p-10 min-h-[400px] mb-8 cursor-pointer relative overflow-hidden group transition-all hover:bg-slate-800"
            onClick={() => setShowAnswer(!showAnswer)}
          >
            {/* Status indicator */}
            {getCurrentCardStatus() !== undefined && (
              <div className="absolute top-6 right-6">
                {getCurrentCardStatus() ? (
                  <div className="bg-green-500/10 p-2 rounded-full border border-green-500/20">
                    <Check className="text-green-400" size={20} />
                  </div>
                ) : (
                  <div className="bg-red-500/10 p-2 rounded-full border border-red-500/20">
                    <X className="text-red-400" size={20} />
                  </div>
                )}
              </div>
            )}

            <div className="text-xs font-bold tracking-widest text-purple-400 mb-6 uppercase">
              {showAnswer ? 'Answer' : 'Question'}
            </div>

            <div className="text-white text-xl leading-relaxed whitespace-pre-wrap font-light">
              {showAnswer ? currentCard.a : currentCard.q}
            </div>

            {showAnswer && currentCard.code && (
              <div className="mt-4 border-t border-slate-700/50 pt-4" onClick={e => e.stopPropagation()}>
                <button
                  onClick={() => setShowCode(!showCode)}
                  className="text-xs font-bold text-purple-400 flex items-center gap-1 hover:text-purple-300 transition-colors"
                >
                  <Code2 size={12} />
                  {showCode ? 'Hide Code' : 'Show Code Example'}
                </button>
                {showCode && (
                  <pre className="mt-2 bg-slate-900/80 p-4 rounded-lg text-xs font-mono text-slate-300 overflow-x-auto border border-slate-700/50 shadow-inner">
                    <code>{currentCard.code}</code>
                  </pre>
                )}
              </div>
            )}

            <div className="absolute bottom-6 right-6 text-slate-600 text-xs flex items-center gap-1 group-hover:text-purple-400 transition-colors">
              Click to flip <RotateCcw size={12} />
            </div>
          </div>

          {/* Controls */}
          <div className="flex gap-6 items-center justify-center mb-8">
            <button
              onClick={prevCard}
              disabled={currentCardIndex === 0}
              className="p-4 bg-slate-800 hover:bg-slate-700 disabled:bg-slate-900 disabled:opacity-30 rounded-xl text-white transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              onClick={() => setShowAnswer(!showAnswer)}
              className="px-8 py-4 bg-purple-600 hover:bg-purple-500 rounded-xl text-white font-bold tracking-wide transition-all shadow-lg shadow-purple-900/50 hover:shadow-purple-700/50 hover:-translate-y-0.5 min-w-[160px]"
            >
              {showAnswer ? 'Hide' : 'Reveal'}
            </button>

            <button
              onClick={nextCard}
              disabled={currentCardIndex === currentCards.length - 1}
              className="p-4 bg-slate-800 hover:bg-slate-700 disabled:bg-slate-900 disabled:opacity-30 rounded-xl text-white transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Mastery buttons */}
          <div className={`flex gap-4 justify-center transition-all duration-500 overflow-hidden ${showAnswer ? 'opacity-100 max-h-20' : 'opacity-0 max-h-0'}`}>
            <button
              onClick={(e) => { e.stopPropagation(); markMastered(false); }}
              className="px-6 py-2.5 bg-slate-800 border border-red-500/30 hover:bg-red-950/30 hover:border-red-500 text-red-200 rounded-lg text-sm font-medium transition-all flex items-center gap-2"
            >
              <X size={16} />
              Need Practice
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); markMastered(true); }}
              className="px-6 py-2.5 bg-slate-800 border border-green-500/30 hover:bg-green-950/30 hover:border-green-500 text-green-200 rounded-lg text-sm font-medium transition-all flex items-center gap-2"
            >
              <Check size={16} />
              Got It
            </button>
          </div>

          {/* Tips */}
          <div className="mt-12 border-t border-slate-800 pt-8">
            <div className="bg-slate-800/50 rounded-xl p-6 text-slate-400 text-sm leading-relaxed max-w-2xl mx-auto">
              <p className="flex gap-2 items-start">
                <span className="text-purple-400 font-bold shrink-0">💡 Pro Tip:</span>
                Focus on 'Why' and 'How' rather than just memorizing syntax. Interviewers look for deep understanding of concepts like the Event Loop or Closures.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default FlashcardApp;