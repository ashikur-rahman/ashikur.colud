<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Md Ashikur Rahman — Portfolio</title>

  <!-- Tailwind CDN -->
  <script src="https://cdn.tailwindcss.com"></script>

  <!-- Your fonts -->
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet">

  <script src="https://code.jquery.com/jquery-3.7.0.min.js"></script>

  <style>
    body { font-family: 'Inter', sans-serif; }
  </style>

  <!-- Custom Tailwind config (soft colors + accent theme) -->
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            ashBlue: "#d9ecff",
            ashSoft: "#f2f2f2",
            ashPrimary: "#2563eb",
            ashSecondary: "#0ea5e9",
          }
        }
      }
    }
  </script>
</head>


<body class="bg-slate-50 text-slate-800">

<div class="wrap max-w-6xl mx-auto p-6">

  <!-- HEADER -->
  <header class="flex items-center justify-between mb-8">
    <div class="flex items-center gap-5">

      <!-- PHOTO -->
      <div id="photoPlaceholder"
           class="w-20 h-20 rounded-full overflow-hidden shadow-lg ring-2 ring-blue-200">
        <img src="photo-placeholder.jpg"
             alt="Md Ashikur Rahman"
             class="w-full h-full object-cover" />
      </div>

      <div>
        <h1 class="text-2xl font-bold tracking-tight">MD ASHIKUR RAHMAN</h1>
        <p class="text-sm text-gray-500">Software Developer | Fintech & AI Automation Specialist</p>

        <p class="text-xs text-slate-500 mt-1">
          London, E16 2JE • +44 7353 215427 •
          <a href="mailto:im.md.ashikur.rahman@gmail.com"
             class="text-blue-600 hover:underline">
             im.md.ashikur.rahman@gmail.com
          </a>
        </p>
      </div>
    </div>

    <div class="flex gap-3">
      <a id="downloadPdf"
         class="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 cursor-pointer">
         Download CV (PDF)
      </a>

      <a id="downloadDoc"
         class="px-4 py-2 bg-white text-blue-600 rounded-lg shadow border hover:bg-blue-50 cursor-pointer">
         Download CV (DOCX)
      </a>
    </div>
  </header>

  <!-- MAIN -->
  <main class="grid grid-cols-1 md:grid-cols-[1fr_350px] gap-6">

    <!-- LEFT SIDE -->
    <section class="space-y-6">

      <!-- SUMMARY -->
      <div class="bg-white rounded-xl shadow p-6">
        <h2 class="text-lg font-semibold">Summary</h2>

        <p class="text-sm leading-relaxed text-slate-600 mt-2">
          Experienced Backend Developer with 12+ years in banking, fintech, and SaaS industries...
        </p>

        <h3 class="font-semibold mt-4 mb-2 text-slate-800">Core Skills</h3>

        <div class="flex flex-wrap gap-2">
          <span class="bg-blue-50 text-blue-700 px-3 py-1 rounded-lg text-xs font-semibold">PHP</span>
          <span class="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-lg text-xs font-semibold">Spring Boot</span>
          <span class="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-lg text-xs font-semibold">Python</span>
          <span class="bg-amber-50 text-amber-700 px-3 py-1 rounded-lg text-xs font-semibold">AI + N8N</span>
          <span class="bg-rose-50 text-rose-700 px-3 py-1 rounded-lg text-xs font-semibold">Docker</span>
        </div>
      </div>

      <!-- PROJECTS -->
      <div class="bg-white rounded-xl shadow p-6">
        <h3 class="text-lg font-semibold mb-3">Selected Projects</h3>

        <div id="projects" class="grid sm:grid-cols-2 gap-3">
          <div class="p-4 bg-slate-50 rounded-lg border hover:shadow-md cursor-pointer proj">
            <strong>Agrani RMS</strong>
            <p class="text-xs text-slate-500">Enterprise remittance engine.</p>
          </div>

          <div class="p-4 bg-slate-50 rounded-lg border hover:shadow-md cursor-pointer proj">
            <strong>Postgraduate-Funding.com</strong>
            <p class="text-xs text-slate-500">UK academic funding CMS.</p>
          </div>
        </div>
      </div>

    </section>

    <!-- RIGHT SIDE / AI CHAT -->
    <aside class="space-y-6">

      <div class="bg-white rounded-xl shadow p-6">
        <h3 class="text-lg font-semibold">Chat With My Autonomous AI Agent</h3>

        <p class="text-xs text-gray-500 mt-1">
          Powered by OpenAI Agents, RAG (Pinecone), Google Calendar API, Gmail API,
          and automated via N8N — the same architecture I build for real clients.
        </p>

        <!-- CHATBOX -->
        <div id="chatBox"
             class="mt-4 h-56 p-4 bg-slate-100 rounded-xl overflow-y-auto shadow-inner"></div>

        <!-- EMAIL -->
        <input id="userInputEmail"
               placeholder="Please provide your email"
               class="mt-3 w-full p-3 rounded-lg border text-sm" />

        <!-- INPUT BAR -->
        <div id="inputBox" class="flex gap-2 mt-3">
          <input id="userInput"
                 placeholder="Ask anything..."
                 class="flex-1 p-3 rounded-lg border text-sm" />
          <button id="sendBtn"
                  class="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700">
            Send
          </button>
        </div>

      </div>

      <div class="bg-white rounded-xl shadow p-6">
        <h4 class="font-semibold mb-2">Education & Certifications</h4>
        <p class="text-xs text-slate-500">
          BSc Computer Science • Zend Certified Engineer (PHP)
        </p>
      </div>

    </aside>

  </main>

  <footer class="text-center text-xs text-gray-500 mt-10">
    © 2025 Md Ashikur Rahman — London •
    <a href="https://www.linkedin.com/in/ashikurrahmanshuvo/"
       target="_blank"
       class="text-blue-600 hover:underline">
       LinkedIn
    </a>
  </footer>

</div>

  <script>
// --------------------------------------------
// 1) GENERATE SESSION ID ONCE PER PAGE LOAD
// --------------------------------------------
let sessionId = localStorage.getItem("ashik_session_id");

if (!sessionId) {
    sessionId = "sess_" + Math.random().toString(36).substr(2, 9) + "_" + Date.now();
    localStorage.setItem("ashik_session_id", sessionId);
    console.log("New session created:", sessionId);
} else {
    console.log("Existing session loaded:", sessionId);
}

// --------------------------------------------
// Chat Interface Logic
// --------------------------------------------
$("#sendBtn").click(function() {
    sendMessage();
});

$("#userInput").on("keypress", function(e) {
    if (e.which === 13) sendMessage();
});

function sendMessage() {
    let text = $("#userInput").val().trim();

    // get email, fallback to default
    const email = $('#userInputEmail').val().trim();
    const email_final = email ? email : 'shuvo133@gmail.com';


    if (!text) return;

    appendUser(text);
    $("#userInput").val("");

    $.ajax({
        url: "submit.php",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            user_email: email_final,
            user_question: text,
            session_id: sessionId
        }),
        success: function(res) {
            appendBot(res.message_clean);
        },
        error: function() {
            appendBot("❌ Error contacting AI Agent.");
        }
    });
}

function appendUser(msg) {
    $("#chatBox").append(`<div class="msg-user">${msg}</div>`);
    scrollBottom();
}

function appendBot(msg) {
    $("#chatBox").append(`<div class="msg-bot">${msg}</div>`);
    scrollBottom();
}

function scrollBottom() {
    let div = document.getElementById("chatBox");
    div.scrollTop = div.scrollHeight;
}
</script>

  <script>
    // Config
    const DEFAULT_PDF = 'resume_md_ashikur_rahman full.pdf'; // point to uploaded PDF
    const DEFAULT_DOC = 'resume_md_ashikur_rahman full.pdf'; // include in package

    // download handlers
    document.getElementById('downloadPdf').addEventListener('click', ()=>{
      window.location.href = DEFAULT_PDF;
    });
    document.getElementById('downloadDoc').addEventListener('click', ()=>{
      // if doc exists on server, navigate; otherwise trigger simple doc download fallback
      window.location.href = DEFAULT_DOC;
    });

    // copy email
    document.getElementById('copyEmail').addEventListener('click', (e)=>{
      e.preventDefault(); navigator.clipboard.writeText('im.md.ashikur.rahman@gmail.com').then(()=>{
        alert('Email copied to clipboard');
      });
    });

    // project modal (simple)
    document.querySelectorAll('.proj').forEach(p=>p.addEventListener('click', ()=>{
      alert(p.querySelector('strong').innerText + '\n\n' + p.querySelector('.small').innerText);
    }))

/*
    // Form: POST JSON to webhook OR fallback to mailto
    document.getElementById('contactForm').addEventListener('submit', async (e)=>{
      e.preventDefault();
      const status = document.getElementById('status');
      status.textContent = 'Sending...';

      const data = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        role: document.getElementById('role').value.trim(),
        message: document.getElementById('message').value.trim(),
        source: 'portfolio-site'
      };

      const webhook = document.getElementById('webhook').value.trim();

      try{
        if(webhook){
          // Send JSON POST to webhook
          const res = await fetch(webhook, {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(data)
          });
          if(res.ok){ status.textContent = 'Message sent via webhook. Thank you!'; document.getElementById('contactForm').reset(); }
          else{ status.textContent = 'Webhook returned error: ' + res.status; }
        } else {
          // fallback: create mailto link
          const subject = encodeURIComponent('Portfolio enquiry from ' + data.name + (data.role? ' for ' + data.role : ''));
          const body = encodeURIComponent(data.message + '\n\nContact: ' + data.email);
          window.location.href = `mailto:im.md.ashikur.rahman@gmail.com?subject=${subject}&body=${body}`;
          status.textContent = 'Opening your email client...';
        }
      }catch(err){
        console.error(err); status.textContent = 'Failed to send message. Please try again or contact via email.';
      }

    });
    */
  </script>
</body>
</html>
