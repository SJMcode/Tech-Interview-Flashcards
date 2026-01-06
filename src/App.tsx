import { useState } from 'react';
import { ChevronLeft, ChevronRight, RotateCcw, Check, X, Code2, Palette, FileJson, Globe, Atom, MessageCircle } from 'lucide-react';

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
      ],
      "HTML Structure & Metadata (Practice)": [
        {
          q: "Practice: Building a Basic HTML5 Page Boilerplate",
          a: "Every HTML5 document should start with a correct boilerplate. \n\nGoal:\n1. Include the DOCTYPE declaration.\n2. Set the language to English.\n3. Add meta tags for charset, viewport, and a description.\n4. Set a document title.",
          code: "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <meta name=\"description\" content=\"Practice Page\">\n  <title>HTML5 Boilerplate</title>\n</head>\n<body>\n  <!-- Content goes here -->\n</body>\n</html>"
        }
      ],
      "Semantic Layout & Accessibility (Practice)": [
        {
          q: "Practice: Creating a Semantic Blog Post Layout",
          a: "Semantic HTML improves accessibility and SEO. \n\nGoal:\n1. Use <header> for the site title.\n2. Use <main> for the primary content area.\n3. Wrap the post in an <article>.\n4. Use <aside> for a sidebar and <footer> for copyright info.\n5. Add alt text to an image.",
          code: "<header>\n  <h1>My Awesome Blog</h1>\n</header>\n<main>\n  <article>\n    <h2>Semantic HTML is Great</h2>\n    <p>Post content...</p>\n    <img src=\"semantic.jpg\" alt=\"Diagram of semantic elements\" />\n  </article>\n  <aside>\n    <h3>Related Posts</h3>\n  </aside>\n</main>\n<footer>\n  <p>&copy; 2024 My Blog</p>\n</footer>"
        }
      ],
      "Forms & Validation (Practice)": [
        {
          q: "Practice: Building a Validated Contact Form",
          a: "Forms are essential for user interaction. \n\nGoal:\n1. Use <form> with action and method.\n2. Add <label> for each input.\n3. Use 'required' for name and email.\n4. Use 'type=\"email\"' for email validation.\n5. Use 'pattern' for a simple zip code validation.\n6. Add a <textarea> and a submit <button>.",
          code: "<form action=\"/submit\" method=\"POST\">\n  <label for=\"name\">Name:</label>\n  <input type=\"text\" id=\"name\" name=\"name\" required>\n\n  <label for=\"email\">Email:</label>\n  <input type=\"email\" id=\"email\" name=\"email\" required>\n\n  <label for=\"zip\">Zip (5 digits):</label>\n  <input type=\"text\" id=\"zip\" name=\"zip\" pattern=\"\\d{5}\">\n\n  <label for=\"msg\">Message:</label>\n  <textarea id=\"msg\" name=\"msg\"></textarea>\n\n  <button type=\"submit\">Send</button>\n</form>"
        }
      ],
      "Tables & Data (Practice)": [
        {
          q: "Practice: Creating a Complex Data Table",
          a: "Tables organize structured data. \n\nGoal:\n1. Use <thead> and <tbody>.\n2. Use <th> for headers.\n3. Merge 2 columns horizontally using 'colspan'.\n4. Merge 2 rows vertically using 'rowspan'.",
          code: "<table>\n  <thead>\n    <tr>\n      <th>Category</th>\n      <th colspan=\"2\">Statistics</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <td rowspan=\"2\">Users</td>\n      <td>Active</td>\n      <td>1000</td>\n    </tr>\n    <tr>\n      <td>Inactive</td>\n      <td>200</td>\n    </tr>\n  </tbody>\n</table>"
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
      ],
      "Classes (Practice)": [
        {
          q: "CSS Class Practice: Styling Sports and Computing History",
          a: "Every HTML element can be assigned a class identifier. This is done by including a class attribute and its associated value in the element's opening tag. Elements that are conceptually grouped in some way can be given the same class attribute value. They should also be given a meaningful name that describes what the element grouping is being used for. We can use CSS to target class attributes and apply a collective style to those elements.\n\nIn this challenge, you will:\n1. Add a class attribute to the first two <h3> elements and give each of them the attribute value of sports-history\n2. Add a class attribute to the second two <h3> elements and give each of them the attribute value of computing-history\n3. Create a style rule beneath the existing id rules that has a corresponding class selector name of sports-history. This will target our sports content\n4. Within that rule, add a declaration that sets the color property to orange\n5. Create another style rule has a corresponding class selector name of computing-history. This will target our programming content\n6. Within that rule add a declaration that sets the color property to green",
          code: "<!DOCTYPE html>\n<html>\n  <head>\n    <meta charset=\"utf-8\">\n    <meta name=\"viewport\" content=\"width=device-width\">\n    <title>Lesson 2 Challenge 4</title>\n    <style>\n    \t#heading{\n    \t  font-family: Arial;\n    \t  background-color: red;\n    \t  color: white;\n    \t}\n      \n        #uppercase {\n          text-transform: uppercase;\n        }\n    \t/* Add your class rules here */\n    \t.sports-history{\n    \t    color:orange;\n    \t}\n    \t.computing-history{\n    \t    color:green;\n    \t}\n    </style>\n  </head>\n  <body>\n    <div id=\"heading\">\n     <h1> Sporting History</h1>\n     <p id=\"uppercase\">\n       Giants & Heroes\n     </p>\n    </div>\n    <h3 class=\"sports-history\"> Track & Field</h3>\n    <p>\n      Some sporting feats ridicule expectations, fewer violate logic but the rarest of all added a defying of gravity to a hat-trick of achievements. At 3.45pm on 18 October 1968 in Mexico City’s Estadio Olímpico Universitario Bob Beamon accomplished all three.\n    </p>\n   \t<h3 class=\"sports-history\">Rugby</h3>\n    <p>\n      With the game locked at 10 - 10 with thirty minutes on the clock, a Munster scrum just outside the Biarritz line enabled Peter Stringer to do the unexpected and break on the blindside for an unforgettable try. A moment of sheer brilliance by the Munster and Ireland scrumhalf. The try proved to be crucial as Munster won by 23 - 19 to lift the European Cup in Cardiff.\n    </p>\n    <h3 class=\"computing-history\">The first Programmer</h3>\n    <p>\n      Ada Lovelace was an English mathematician and writer, chiefly known for her work on Charles Babbage's proposed mechanical general-purpose computer, the Analytical Engine. She was the first to recognise that the machine had applications beyond pure calculation, and published the first algorithm intended to be carried out by such a machine. As a result, she is sometimes regarded as the first to recognise the full potential of a \"computing machine\" and the first computer programmer.\n    </p>\n    <h3 class=\"computing-history\">The first Compiler</h3>\n    <p>\n      Grace Hopper was an American computer scientist and United States Navy rear admiral. One of the first programmers of the Harvard Mark I computer, she was a pioneer of computer programming who invented one of the first compiler related tools.\n    </p>\n  </body>\n</html>"
        }
      ],
      "Box Model & Spacing (Practice)": [
        {
          q: "Practice: Building a Card with Custom Box Model",
          a: "The Box Model consists of content, padding, border, and margin. \n\nGoal:\n1. Create a card with 20px padding.\n2. Add a 5px solid border.\n3. Add 15px margin to separate it from others.\n4. Use box-sizing: border-box to ensure the total width includes padding and border.",
          code: ".card {\n  width: 300px;\n  padding: 20px;\n  border: 5px solid #333;\n  margin: 15px;\n  box-sizing: border-box;\n  background: #f9f9f9;\n}"
        }
      ],
      "Selectors & Specificity (Practice)": [
        {
          q: "Practice: Targeting Nested Elements",
          a: "Selectors allow us to target specific elements using combinations. \n\nGoal:\n1. Target only direct 'p' children of a 'div' using the child combinator (>).\n2. Target a 'p' that is an adjacent sibling of an 'h1' using (+).\n3. Understand that an ID selector (#id) has higher specificity than a class selector (.class).",
          code: "/* Direct child */\ndiv > p {\n  color: blue;\n}\n\n/* Adjacent sibling */\nh1 + p {\n  font-weight: bold;\n}\n\n/* Specificity Example */\n#main-title { color: red; } /* Wins */\n.title { color: blue; }     /* Loses */"
        }
      ],
      "Flexbox Layout (Practice)": [
        {
          q: "Practice: Centering and Aligning with Flexbox",
          a: "Flexbox is ideal for 1D layouts and centering. \n\nGoal:\n1. Center a child both horizontally and vertically.\n2. Create a navigation bar with space-between items.",
          code: "/* Centering */\n.center-container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 200px;\n}\n\n/* Navbar */\n.nav {\n  display: flex;\n  justify-content: space-between;\n  padding: 1rem;\n}"
        }
      ],
      "Grid Layout (Practice)": [
        {
          q: "Practice: Creating a 3-Column Responsive Grid",
          a: "CSS Grid is powerful for 2D layouts. \n\nGoal:\n1. Create a grid with 3 equal columns.\n2. Use 'gap' for spacing.\n3. Use 'repeat(auto-fit, minmax(...))' for basic responsiveness.",
          code: ".grid-container {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 20px;\n}\n\n/* Responsive version */\n.responsive-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n  gap: 1rem;\n}"
        }
      ],
      "Position & Layering (Practice)": [
        {
          q: "Practice: Creating an Overlay and Sticky Header",
          a: "Positioning controls where elements sit in the document flow. \n\nGoal:\n1. Create a sticky header that stays at the top.\n2. Create an absolute-positioned badge inside a relative-positioned card.\n3. Use z-index to manage layering.",
          code: ".header {\n  position: sticky;\n  top: 0;\n  z-index: 100;\n}\n\n.card {\n  position: relative;\n}\n\n.badge {\n  position: absolute;\n  top: -10px;\n  right: -10px;\n}"
        }
      ],
      "Animations & Effects (Practice)": [
        {
          q: "Practice: Hover Transitions and Keyframe Animations",
          a: "Animations bring life to the UI. \n\nGoal:\n1. Add a smooth scale transition on hover.\n2. Create a 'fade-in' keyframe animation.",
          code: "/* Transition */\n.btn {\n  transition: transform 0.2s ease;\n}\n.btn:hover {\n  transform: scale(1.1);\n}\n\n/* Animation */\n@keyframes fadeIn {\n  from { opacity: 0; }\n  to { opacity: 1; }\n}\n.popup {\n  animation: fadeIn 0.5s ease-in-out;\n}"
        }
      ],
      "Responsive Design & Units (Practice)": [
        {
          q: "Practice: Fluid Typography and Mobile First",
          a: "Modern responsive design uses fluid units and media queries. \n\nGoal:\n1. Use 'rem' for accessibility.\n2. Use 'clamp()' for fluid font sizes.\n3. Apply mobile-first media queries.",
          code: "body {\n  font-size: 1rem; /* Base 16px */\n}\n\nh1 {\n  font-size: clamp(1.5rem, 5vw, 3rem);\n}\n\n/* Desktop override */\n@media (min-width: 1024px) {\n  .container {\n    max-width: 1200px;\n    margin: 0 auto;\n  }\n}"
        }
      ]
    },
    JavaScript: {
      "Fundamentals": [
        {
          q: "What are the JavaScript Data Types?",
          a: "Primitives: string, number, boolean, undefined, null, symbol, bigint.\nReference: objects (including arrays, functions).",
          code: "let str = 'hello'; // Primitive\nlet obj = { a: 1 }; // Reference\nlet arr = [1, 2];   // Reference"
        },
        {
          q: "Explain Global, Function, and Block scope.",
          a: "Global: Accessible everywhere.\nFunction: Accessible only within the function.\nBlock: Accessible only within { } (let/const only).",
          code: "let globalVar = 'I am global';\n\nfunction test() {\n  let funcVar = 'I am function';\n  if (true) {\n    let blockVar = 'I am block';\n  }\n}"
        },
        {
          q: "What is Hoisting?",
          a: "The behavior of moving declarations to the top of their scope during compilation. 'var' is hoisted and initialized as 'undefined'. Functions are fully hoisted. 'let' and 'const' are hoisted but not initialized (TDZ).",
          code: "console.log(x); // undefined\nvar x = 5;\n\nhello(); // works\nfunction hello() { console.log('hi'); }"
        },
        {
          q: "What is the Temporal Dead Zone (TDZ)?",
          a: "The period between a variable's creation and its initialization where accessing it throws a ReferenceError. Applies to 'let' and 'const'.",
          code: "{\n  // TDZ starts\n  console.log(a); // ReferenceError\n  let a = 10; // TDZ ends\n}"
        }
      ],
      "Functions & Objects": [
        {
          q: "How does 'this' work in JavaScript?",
          a: "Value depends on how a function is called:\n1. Global: window/undefined (strict).\n2. Method: The object.\n3. Constructor (new): The new instance.\n4. Arrow: Inherits from lexical scope.\n5. Explicit: Bind, Call, Apply.",
          code: "const obj = {\n  fn: function() { console.log(this); }\n};\nobj.fn(); // this is obj\n\nconst arrowFn = () => console.log(this);\n// this is lexical scope"
        },
        {
          q: "call(), apply(), and bind()",
          a: "Call: Invokes function immediately with arguments list.\nApply: Invokes function immediately with arguments array.\nBind: Returns a new function with fixed 'this'.",
          code: "fn.call(obj, arg1, arg2);\nfn.apply(obj, [arg1, arg2]);\nconst bound = fn.bind(obj);"
        },
        {
          q: "What is a closure?",
          a: "A closure is when a function 'remembers' variables from its outer scope, even after that outer function has finished executing.",
          code: "function outer() {\n  let count = 0;\n  return function inner() {\n    count++;\n    return count;\n  }\n}\nconst counter = outer();"
        },
        {
          q: "Explain Prototypal Inheritance.",
          a: "Objects in JS have a link to a prototype object. If a property isn't found, JS looks up the 'prototype chain' until it finds it or reaches null.",
          code: "const animal = { eats: true };\nconst rabbit = Object.create(animal);\nconsole.log(rabbit.eats); // true (inherited)"
        },
        {
          q: "Higher-Order Functions",
          a: "Functions that take one or more functions as arguments or return a function as their result.",
          code: "const multiply = (a) => (b) => a * b;\nconst double = multiply(2);\nconsole.log(double(10)); // 20"
        }
      ],
      "Advanced Patterns": [
        {
          q: "Explain Memoization.",
          a: "An optimization technique used to speed up programs by storing the results of expensive function calls and returning the cached result when the same inputs occur again.",
          code: "const memoize = (fn) => {\n  const cache = {};\n  return (...args) => {\n    const key = JSON.stringify(args);\n    return cache[key] || (cache[key] = fn(...args));\n  };\n};"
        },
        {
          q: "What is Currying?",
          a: "A technique of evaluating function with multiple arguments, into sequence of functions with single argument.",
          code: "const curry = (f) => (a) => (b) => f(a, b);"
        },
        {
          q: "Debouncing and Throttling",
          a: "Debounce: Executes function after a period of inactivity.\nThrottle: Executes function at most once every specified interval.",
          code: "// Debounce\nsetTimeout(() => fn(), delay);\n// Throttle\nif (!waiting) { fn(); waiting = true; }"
        },
        {
          q: "Garbage Collection in JS",
          a: "Memory is allocated when objects are created and 'automatically' freed when they are no longer needed (Mark-and-Sweep algorithm).",
          code: "let obj = { name: 'test' };\nobj = null; // Eligible for GC"
        }
      ],
      "Asynchronous JS": [
        {
          q: "What is a Promise?",
          a: "An object representing the eventual completion or failure of an asynchronous operation. States: Pending, Fulfilled, Rejected.",
          code: "const promise = new Promise((resolve, reject) => {\n  setTimeout(() => resolve('Done!'), 1000);\n});"
        },
        {
          q: "Async/Await",
          a: "Syntactic sugar for Promises, making asynchronous code look and behave like synchronous code.",
          code: "async function fetchData() {\n  const res = await fetch(url);\n  const data = await res.json();\n}"
        },
        {
          q: "Event Loop: Microtasks vs Macrotasks",
          a: "Microtasks (Promises, process.nextTick) have higher priority than Macrotasks (setTimeout, setInterval). The loop runs all microtasks before the next macrotask.",
          code: "setTimeout(() => console.log('Macro'), 0);\nPromise.resolve().then(() => console.log('Micro'));\n// Micro, then Macro"
        },
        {
          q: "What is Fetch API?",
          a: "Modern replacement for XMLHttpRequest. Returns a Promise that resolves to the Response object.",
          code: "fetch('https://api.example.com/data')\n  .then(response => response.json())\n  .then(data => console.log(data));"
        }
      ],
      "Modern ES6+": [
        {
          q: "Destructuring (Array & Object)",
          a: "A syntax that allows unpacking values from arrays or properties from objects into distinct variables.",
          code: "const { name, age } = user;\nconst [first, second] = colors;"
        },
        {
          q: "Spread and Rest Operators",
          a: "Spread (...) expands elements. Rest (...) collects elements into an array.",
          code: "const arr = [...oldArr, 1, 2]; // Spread\nfunction sum(...args) { } // Rest"
        },
        {
          q: "ES Modules (Import/Export)",
          a: "The standard for modularizing JavaScript. Allows sharing code between files.",
          code: "// file.js\nexport const x = 1;\n// app.js\nimport { x } from './file.js';"
        },
        {
          q: "JavaScript Classes",
          a: "Syntactic sugar over prototypal inheritance. Provide a cleaner way to create objects and handle inheritance.",
          code: "class Animal {\n  constructor(name) { this.name = name; }\n  speak() { console.log('hi'); }\n}\nclass Dog extends Animal { }"
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
    sub: "Fundamentals"
  });

  // State for expanded categories in sidebar
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    "JavaScript": true
  });

  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [showDiscord, setShowDiscord] = useState(false);
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

      {/* Discord Widget */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-4">
        {showDiscord && (
          <div className="bg-slate-900 border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="p-3 bg-slate-800 border-b border-slate-700/50 flex justify-between items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="text-xs font-bold text-purple-300 tracking-wider">COMMUNITY CHAT</span>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href="https://discord.gg/your-invite-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] font-bold bg-indigo-600 hover:bg-indigo-500 text-white px-2 py-1 rounded transition-colors uppercase"
                >
                  Join Server
                </a>
                <button
                  onClick={() => setShowDiscord(false)}
                  className="text-slate-500 hover:text-white transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
            <iframe
              src="https://e.widgetbot.io/channels/1362329821115584616/1362329821115584616"
              width="350"
              height="500"
              allowTransparency={true}
              frameBorder="0"
              sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
              className="bg-slate-900"
            />
          </div>
        )}

        <button
          onClick={() => setShowDiscord(!showDiscord)}
          className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 group ${showDiscord
            ? 'bg-red-500 hover:bg-red-600 rotate-90'
            : 'bg-indigo-600 hover:bg-indigo-50 hover:shadow-indigo-500/20 hover:-translate-y-1'
            }`}
        >
          {showDiscord ? (
            <X className="text-white" size={24} />
          ) : (
            <>
              <MessageCircle className="text-white group-hover:scale-110 transition-transform" size={28} />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 border-2 border-slate-900 rounded-full" />
            </>
          )}

          {/* Tooltip */}
          <div className="absolute right-full mr-4 px-3 py-1.5 bg-indigo-600 text-white text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl">
            Join the Community
            <div className="absolute top-1/2 -right-1 -translate-y-1/2 border-8 border-transparent border-l-indigo-600" />
          </div>
        </button>
      </div>
    </div>
  );
};

export default FlashcardApp;