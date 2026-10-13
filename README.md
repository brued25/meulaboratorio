<!DOCTYPE html>
<html lang="pt-BR" class="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>O Laboratório Digital — Arquivo de Ciência, Tecnologia, Música & Ficção</title>

    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    
    <!-- Font Awesome Icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    
    <!-- Google Fonts: Inter and JetBrains Mono -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:ital,wght@0,400;0,500;0,700;1,400&display=swap" rel="stylesheet">

    <!-- Tailwind Configuration -->
    <script>
        tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    colors: {
                        labDark: '#070A0F',
                        labCard: '#0F172A',
                        labBorder: '#1E293B',
                        cyanNeon: '#00F0FF',
                        greenNeon: '#10B981',
                        purpleNeon: '#8B5CF6',
                        goldWarm: '#F59E0B'
                    },
                    fontFamily: {
                        sans: ['Inter', 'sans-serif'],
                        mono: ['JetBrains Mono', 'monospace'],
                    }
                }
            }
        }
    </script>

    <style>
        body {
            background-color: #070A0F;
            color: #E2E8F0;
            font-family: 'Inter', sans-serif;
            overflow-x: hidden;
        }

        .glass-panel {
            background: rgba(15, 23, 42, 0.75);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border: 1px solid rgba(30, 41, 59, 0.8);
        }

        .glass-card {
            background: rgba(15, 23, 42, 0.6);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(30, 41, 59, 0.7);
            transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .glass-card:hover {
            border-color: rgba(0, 240, 255, 0.4);
            transform: translateY(-3px);
            box-shadow: 0 10px 30px -10px rgba(0, 240, 255, 0.15);
        }

        /* Custom Scrollbar */
        ::-webkit-scrollbar {
            width: 8px;
            height: 8px;
        }
        ::-webkit-scrollbar-track {
            background: #070A0F;
        }
        ::-webkit-scrollbar-thumb {
            background: #1E293B;
            border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
            background: #00F0FF;
        }

        .active-tab {
            background-color: rgba(0, 240, 255, 0.15) !important;
            color: #00F0FF !important;
            border-color: rgba(0, 240, 255, 0.4) !important;
        }

        @keyframes pulseGlow {
            0%, 100% { opacity: 0.4; }
            50% { opacity: 0.8; }
        }

        .glow-bg {
            animation: pulseGlow 6s infinite ease-in-out;
        }
    </style>
</head>
<body class="min-h-screen flex flex-col justify-between selection:bg-cyanNeon selection:text-black">

    <header class="sticky top-0 z-40 glass-panel border-b border-labBorder/80">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
            
            <!-- Brand Logo -->
            <div class="flex items-center gap-3 cursor-pointer" onclick="showSection('creations')">
                <div class="w-11 h-11 rounded-2xl bg-gradient-to-tr from-cyanNeon/20 via-greenNeon/20 to-purpleNeon/20 flex items-center justify-center border border-cyanNeon/40 text-cyanNeon shadow-lg shadow-cyanNeon/10">
                    <i class="fa-solid fa-dna text-xl animate-pulse"></i>
                </div>
                <div>
                    <h1 class="font-extrabold text-base sm:text-lg text-white tracking-wide flex items-center gap-2">
                        LABORATÓRIO DIGITAL
                        <span class="text-[10px] px-2 py-0.5 rounded bg-cyanNeon/10 text-cyanNeon border border-cyanNeon/30 font-mono">v2.0</span>
                    </h1>
                    <p class="text-xs text-slate-400 font-mono hidden sm:block">Ciência • Tecnologia • Música • Ficção</p>
                </div>
            </div>

            <!-- Desktop Nav Links -->
            <nav class="hidden md:flex items-center gap-1 font-mono text-xs">
                <button onclick="showSection('creations')" id="nav-creations" class="nav-link px-3 py-2 rounded-xl text-slate-300 hover:text-cyanNeon hover:bg-slate-800/60 transition-all active-tab">
                    <i class="fa-solid fa-folder-open mr-1.5"></i>Criações
                </button>
                <button onclick="showSection('simulations')" id="nav-simulations" class="nav-link px-3 py-2 rounded-xl text-slate-300 hover:text-cyanNeon hover:bg-slate-800/60 transition-all">
                    <i class="fa-solid fa-flask-vial mr-1.5 text-greenNeon"></i>Simulações
                </button>
                <button onclick="showSection('timeline')" id="nav-timeline" class="nav-link px-3 py-2 rounded-xl text-slate-300 hover:text-cyanNeon hover:bg-slate-800/60 transition-all">
                    <i class="fa-solid fa-timeline mr-1.5 text-purpleNeon"></i>Linha do Tempo
                </button>
                <button onclick="showSection('about')" id="nav-about" class="nav-link px-3 py-2 rounded-xl text-slate-300 hover:text-cyanNeon hover:bg-slate-800/60 transition-all">
                    <i class="fa-solid fa-microscope mr-1.5 text-goldWarm"></i>Sobre
                </button>
            </nav>

            <!-- Action Buttons -->
            <div class="flex items-center gap-2">
                <button onclick="openModal('addModal')" class="px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyanNeon/20 to-greenNeon/20 hover:from-cyanNeon/30 hover:to-greenNeon/30 text-white font-medium text-xs sm:text-sm border border-cyanNeon/40 flex items-center gap-2 transition-all shadow-lg hover:shadow-cyanNeon/20">
                    <i class="fa-solid fa-plus text-cyanNeon"></i>
                    <span class="hidden sm:inline">Nova Criação</span>
                </button>
                
                <button onclick="exportData()" title="Exportar Backup (JSON)" class="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700/60 text-xs font-mono transition-all">
                    <i class="fa-solid fa-download"></i>
                </button>

                <label title="Importar Backup (JSON)" class="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700/60 text-xs font-mono transition-all cursor-pointer">
                    <i class="fa-solid fa-upload"></i>
                    <input type="file" id="importInput" accept=".json" onchange="importData(event)" class="hidden">
                </label>
            </div>
        </div>

        <!-- Mobile Navigation Bar -->
        <div class="md:hidden flex items-center justify-around border-t border-labBorder py-2 bg-slate-950/80 text-xs font-mono">
            <button onclick="showSection('creations')" class="text-slate-300 hover:text-cyanNeon flex flex-col items-center gap-1">
                <i class="fa-solid fa-folder-open"></i>Criações
            </button>
            <button onclick="showSection('simulations')" class="text-slate-300 hover:text-cyanNeon flex flex-col items-center gap-1">
                <i class="fa-solid fa-flask-vial text-greenNeon"></i>Simulações
            </button>
            <button onclick="showSection('timeline')" class="text-slate-300 hover:text-cyanNeon flex flex-col items-center gap-1">
                <i class="fa-solid fa-timeline text-purpleNeon"></i>Linha do Tempo
            </button>
            <button onclick="showSection('about')" class="text-slate-300 hover:text-cyanNeon flex flex-col items-center gap-1">
                <i class="fa-solid fa-microscope text-goldWarm"></i>Sobre
            </button>
        </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        
        <!-- SECTION 1: CREATIONS GALLERY -->
        <section id="section-creations" class="space-y-8">
            
            <!-- Hero Banner -->
            <div class="glass-panel rounded-3xl p-6 sm:p-8 border border-labBorder relative overflow-hidden">
                <div class="absolute -right-16 -bottom-16 w-80 h-80 bg-cyanNeon/10 rounded-full blur-3xl pointer-events-none glow-bg"></div>
                <div class="absolute -left-16 -top-16 w-80 h-80 bg-purpleNeon/10 rounded-full blur-3xl pointer-events-none glow-bg"></div>
                
                <div class="relative z-10 max-w-3xl">
                    <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 text-xs font-mono text-cyanNeon mb-4 border border-cyanNeon/30">
                        <span class="w-2 h-2 rounded-full bg-greenNeon animate-ping"></span>
                        Arquivo Pessoal de Projetos & Estudos Comprovados
                    </div>
                    <h2 class="text-2xl sm:text-4xl font-black text-white tracking-tight mb-3">
                        Registrando a ciência, o código e a música sem perder o rigor.
                    </h2>
                    <p class="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
                        Este repositório reúne meus estudos, simulações em Python/Java, composições musicais, livros de ficção científica e publicações acadêmicas. Cada projeto possui fundamentação teórica ou bibliografia investigável.
                    </p>
                    
                    <!-- Stats Badge Bar -->
                    <div class="flex flex-wrap gap-3 text-xs font-mono">
                        <div class="bg-slate-900/90 px-3.5 py-2 rounded-xl border border-slate-700/60 flex items-center gap-2">
                            <i class="fa-solid fa-boxes-stacked text-cyanNeon"></i>
                            <span class="text-slate-400">Total:</span>
                            <strong class="text-white" id="stat-total">0</strong>
                        </div>
                        <div class="bg-slate-900/90 px-3.5 py-2 rounded-xl border border-slate-700/60 flex items-center gap-2">
                            <i class="fa-solid fa-dna text-greenNeon"></i>
                            <span class="text-slate-400">Biologia:</span>
                            <strong class="text-white" id="stat-bio">0</strong>
                        </div>
                        <div class="bg-slate-900/90 px-3.5 py-2 rounded-xl border border-slate-700/60 flex items-center gap-2">
                            <i class="fa-solid fa-code text-purpleNeon"></i>
                            <span class="text-slate-400">Código/Games:</span>
                            <strong class="text-white" id="stat-code">0</strong>
                        </div>
                        <div class="bg-slate-900/90 px-3.5 py-2 rounded-xl border border-slate-700/60 flex items-center gap-2">
                            <i class="fa-solid fa-music text-goldWarm"></i>
                            <span class="text-slate-400">Música:</span>
                            <strong class="text-white" id="stat-music">0</strong>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Controls, Search & Filter Bar -->
            <div class="space-y-4">
                <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-labBorder pb-4">
                    
                    <!-- Category Filters -->
                    <div class="flex flex-wrap gap-2" id="categoryTabs">
                        <button onclick="setCategoryFilter('all')" data-cat="all" class="cat-btn px-3.5 py-2 rounded-xl text-xs font-mono font-medium transition-all active-tab border border-slate-700">
                            <i class="fa-solid fa-border-all mr-1.5"></i>Todos
                        </button>
                        <button onclick="setCategoryFilter('biologia')" data-cat="biologia" class="cat-btn px-3.5 py-2 rounded-xl text-xs font-mono font-medium text-slate-400 hover:text-white border border-transparent hover:bg-slate-800">
                            <i class="fa-solid fa-dna mr-1.5 text-greenNeon"></i>Biologia
                        </button>
                        <button onclick="setCategoryFilter('programacao')" data-cat="programacao" class="cat-btn px-3.5 py-2 rounded-xl text-xs font-mono font-medium text-slate-400 hover:text-white border border-transparent hover:bg-slate-800">
                            <i class="fa-solid fa-code mr-1.5 text-cyanNeon"></i>Programação & Jogos
                        </button>
                        <button onclick="setCategoryFilter('musica')" data-cat="musica" class="cat-btn px-3.5 py-2 rounded-xl text-xs font-mono font-medium text-slate-400 hover:text-white border border-transparent hover:bg-slate-800">
                            <i class="fa-solid fa-music mr-1.5 text-goldWarm"></i>Música
                        </button>
                        <button onclick="setCategoryFilter('livros')" data-cat="livros" class="cat-btn px-3.5 py-2 rounded-xl text-xs font-mono font-medium text-slate-400 hover:text-white border border-transparent hover:bg-slate-800">
                            <i class="fa-solid fa-book mr-1.5 text-purpleNeon"></i>Ficção & Livros
                        </button>
                        <button onclick="setCategoryFilter('artigos')" data-cat="artigos" class="cat-btn px-3.5 py-2 rounded-xl text-xs font-mono font-medium text-slate-400 hover:text-white border border-transparent hover:bg-slate-800">
                            <i class="fa-solid fa-file-lines mr-1.5 text-emerald-400"></i>Artigos
                        </button>
                    </div>

                    <!-- Search Input -->
                    <div class="relative min-w-[260px]">
                        <i class="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-xs"></i>
                        <input type="text" id="searchInput" oninput="handleSearch()" placeholder="Buscar título, tag ou artigo..." class="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl pl-9 pr-4 py-2 text-xs font-sans text-white focus:outline-none focus:border-cyanNeon transition-all">
                    </div>
                </div>

                <!-- Quick Tag Filter Chips -->
                <div class="flex flex-wrap items-center gap-2 text-xs">
                    <span class="text-slate-500 font-mono text-[11px]">Tags populares:</span>
                    <button onclick="filterByTag('Python')" class="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 font-mono text-[11px] border border-slate-700/60">#Python</button>
                    <button onclick="filterByTag('Mitose')" class="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 font-mono text-[11px] border border-slate-700/60">#Mitose</button>
                    <button onclick="filterByTag('Livro')" class="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 font-mono text-[11px] border border-slate-700/60">#Livro</button>
                    <button onclick="filterByTag('DNA')" class="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 font-mono text-[11px] border border-slate-700/60">#DNA</button>
                    <button onclick="filterByTag('Java')" class="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 font-mono text-[11px] border border-slate-700/60">#Java</button>
                    <button onclick="filterByTag('Piano')" class="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 font-mono text-[11px] border border-slate-700/60">#Piano</button>
                    <button onclick="clearTagFilter()" id="clearTagBtn" class="hidden px-2.5 py-1 rounded-lg bg-red-950/40 hover:bg-red-900/50 text-red-300 font-mono text-[11px] border border-red-800/50">
                        <i class="fa-solid fa-xmark mr-1"></i>Limpar Filtro
                    </button>
                </div>
            </div>

            <!-- Cards Grid -->
            <div id="cardsGrid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <!-- Cards render via JavaScript -->
            </div>

            <!-- Empty State -->
            <div id="emptyState" class="hidden text-center py-20 glass-panel rounded-2xl border border-labBorder">
                <i class="fa-solid fa-microscope text-4xl text-slate-600 mb-3"></i>
                <p class="text-slate-300 font-medium">Nenhuma criação encontrada com esses critérios.</p>
                <p class="text-xs text-slate-500 mt-1 font-mono">Tente refazer a busca ou adicione um novo projeto!</p>
            </div>
        </section>

        <!-- SECTION 2: INTERACTIVE SIMULATIONS -->
        <section id="section-simulations" class="hidden space-y-8">
            <div class="border-b border-labBorder pb-4">
                <h3 class="text-xl font-bold text-white flex items-center gap-2">
                    <i class="fa-solid fa-flask-vial text-greenNeon"></i>
                    Simulações Interativas (Biologia + Código + Som)
                </h3>
                <p class="text-xs text-slate-400 font-mono mt-1">
                    Experimentos em tempo real construídos com JavaScript, Canvas 2D e Web Audio API.
                </p>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                <!-- SIM 1: DNA to Musical Chords Translator -->
                <div class="glass-panel p-6 rounded-3xl border border-labBorder flex flex-col justify-between space-y-4">
                    <div>
                        <div class="flex items-center justify-between mb-3">
                            <h4 class="font-bold text-white text-base flex items-center gap-2">
                                <i class="fa-solid fa-music text-purpleNeon"></i>
                                Tradutor de DNA para Acordes Musicais
                            </h4>
                            <span class="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-purpleNeon/20 text-purpleNeon border border-purpleNeon/30 uppercase">Web Audio API</span>
                        </div>
                        <p class="text-xs text-slate-300 leading-relaxed mb-4">
                            Mapeia sequências de nucleotídeos (<strong class="text-cyanNeon">A</strong>denina, <strong class="text-greenNeon">T</strong>imina, <strong class="text-goldWarm">C</strong>itosina, <strong class="text-purpleNeon">G</strong>uanina) em notas e frequências harmônicas.
                        </p>

                        <div class="space-y-3">
                            <label class="block text-xs font-mono text-slate-400">Sequência de DNA:</label>
                            <div class="flex gap-2">
                                <input type="text" id="dnaInput" value="ATG-CGA-TAC-GCC-GTA-GCT" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs font-mono text-cyanNeon tracking-widest uppercase focus:outline-none focus:border-cyanNeon" placeholder="Digite A, T, C, G...">
                                <button onclick="playDnaSequence()" class="px-4 py-2 bg-purpleNeon/20 hover:bg-purpleNeon/30 text-purpleNeon border border-purpleNeon/40 rounded-xl text-xs font-bold font-mono transition-all flex items-center gap-2 whitespace-nowrap shadow-lg shadow-purpleNeon/10">
                                    <i class="fa-solid fa-play"></i> Tocar DNA
                                </button>
                            </div>

                            <div class="flex gap-2">
                                <button onclick="insertDnaPreset('ATGCGATACGCCGTAG')" class="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-[11px] font-mono">Preset 1 (Genético)</button>
                                <button onclick="insertDnaPreset('AATTCGGCCTAATTCG')" class="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-[11px] font-mono">Preset 2 (Melódico)</button>
                            </div>
                        </div>
                    </div>

                    <div>
                        <span class="block text-[11px] font-mono text-slate-400 mb-2">Visualizador de Frequências Biológicas:</span>
                        <div id="dnaVisualizer" class="h-16 bg-slate-950 rounded-2xl border border-slate-800/80 flex items-center justify-center gap-1.5 px-3 overflow-x-auto">
                            <span class="text-xs text-slate-500 font-mono">Pressione "Tocar DNA" para ouvir a síntese sonora</span>
                        </div>
                    </div>
                </div>

                <!-- SIM 2: Cell Division & Mitosis Canvas -->
                <div class="glass-panel p-6 rounded-3xl border border-labBorder flex flex-col justify-between space-y-4">
                    <div>
                        <div class="flex items-center justify-between mb-3">
                            <h4 class="font-bold text-white text-base flex items-center gap-2">
                                <i class="fa-solid fa-dharmachakra text-greenNeon"></i>
                                Simulador de Divisão Celular (Mitose)
                            </h4>
                            <span class="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-greenNeon/20 text-greenNeon border border-greenNeon/30 uppercase">HTML5 Canvas</span>
                        </div>
                        <p class="text-xs text-slate-300 leading-relaxed mb-4">
                            Simulação interativa das fases da mitose celular (Prófase, Metáfase, Anáfase e Telófase).
                        </p>

                        <div class="flex flex-wrap items-center justify-between gap-3 mb-3">
                            <div class="flex gap-2">
                                <button onclick="startMitosis()" class="px-3.5 py-1.5 bg-greenNeon/20 hover:bg-greenNeon/30 text-greenNeon border border-greenNeon/40 rounded-xl text-xs font-mono font-bold transition-all">
                                    <i class="fa-solid fa-play mr-1"></i> Iniciar Divisão
                                </button>
                                <button onclick="resetMitosis()" class="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-mono transition-all">
                                    <i class="fa-solid fa-rotate-left mr-1"></i> Reset
                                </button>
                            </div>
                            <span id="mitosisPhaseText" class="text-xs font-mono text-goldWarm font-semibold">Fase: Interfase</span>
                        </div>
                    </div>

                    <div class="w-full h-44 bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden relative">
                        <canvas id="mitosisCanvas" class="w-full h-full"></canvas>
                    </div>
                </div>

            </div>
        </section>

        <!-- SECTION 3: TIMELINE / STUDY LOG -->
        <section id="section-timeline" class="hidden space-y-6">
            <div class="border-b border-labBorder pb-4">
                <h3 class="text-xl font-bold text-white flex items-center gap-2">
                    <i class="fa-solid fa-timeline text-purpleNeon"></i>
                    Linha do Tempo & Registro de Estudos (Study Log)
                </h3>
                <p class="text-xs text-slate-400 font-mono mt-1">
                    Histórico cronológico da jornada entre Biologia, Programação, Música e Publicações.
                </p>
            </div>

            <div class="relative border-l-2 border-slate-800 ml-4 pl-6 space-y-8 py-4" id="timelineContainer">
                <!-- Timeline items render via JavaScript -->
            </div>
        </section>

        <!-- SECTION 4: ABOUT -->
        <section id="section-about" class="hidden space-y-8">
            <div class="glass-panel p-8 rounded-3xl border border-labBorder max-w-4xl mx-auto space-y-6">
                <div class="flex items-center gap-4 border-b border-labBorder pb-6">
                    <div class="w-16 h-16 rounded-2xl bg-cyanNeon/10 border border-cyanNeon/30 flex items-center justify-center text-cyanNeon text-2xl">
                        <i class="fa-solid fa-user-gear"></i>
                    </div>
                    <div>
                        <h3 class="text-2xl font-bold text-white">Sobre o Laboratório Digital</h3>
                        <p class="text-xs text-slate-400 font-mono">Bióloga • Bacharel em Ciência & Tecnologia • Programadora • Empreendedora</p>
                    </div>
                </div>

                <div class="space-y-4 text-sm text-slate-300 leading-relaxed">
                    <p>
                        Este arquivo digital foi criado para unificar e registrar produções científicas e criativas de forma prática, direta e fundamentada. A proposta é simples: <strong>não deixar nada se perder</strong>.
                    </p>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                        <div class="bg-slate-900/90 p-4 rounded-2xl border border-slate-800">
                            <h4 class="font-bold text-cyanNeon text-xs font-mono uppercase mb-2">
                                <i class="fa-solid fa-flask mr-1"></i> Formação & Ciência
                            </h4>
                            <p class="text-xs text-slate-400">
                                Graduada em Biologia e Ciência & Tecnologia, com artigos publicados, coautoria acadêmica e autor do livro de ficção biológica fundamentado em artigos científicos reais.
                            </p>
                        </div>

                        <div class="bg-slate-900/90 p-4 rounded-2xl border border-slate-800">
                            <h4 class="font-bold text-purpleNeon text-xs font-mono uppercase mb-2">
                                <i class="fa-solid fa-music mr-1"></i> Escola de Música & Código
                            </h4>
                            <p class="text-xs text-slate-400">
                                Fundadora de escola de música, compositora e entusiasta de programação em Python, Java e jogos em HTML5/Canvas aplicados à biologia.
                            </p>
                        </div>
                    </div>

                    <p class="text-xs text-slate-400 font-mono bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                        "A ciência e a arte não se excluem; ambas utilizam a observação de padrões para compreender a realidade."
                    </p>
                </div>
            </div>
        </section>

    </main>

    <!-- MODAL 1: ITEM DETAIL MODAL -->
    <div id="detailModal" class="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 opacity-0 pointer-events-none transition-opacity duration-300">
        <div class="glass-panel w-full max-w-3xl max-h-[90vh] rounded-3xl border border-labBorder overflow-hidden flex flex-col shadow-2xl">
            
            <!-- Modal Header -->
            <div class="px-6 py-4 border-b border-labBorder flex items-center justify-between bg-slate-950/80">
                <div class="flex items-center gap-3">
                    <span id="modalCategoryBadge" class="px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase"></span>
                    <span id="modalDate" class="text-xs text-slate-400 font-mono"></span>
                </div>
                <button onclick="closeModal('detailModal')" class="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-slate-800 transition-all">
                    <i class="fa-solid fa-xmark text-lg"></i>
                </button>
            </div>

            <!-- Modal Content (Scrollable) -->
            <div class="p-6 overflow-y-auto space-y-6 flex-1">
                <div>
                    <h2 id="modalTitle" class="text-xl sm:text-2xl font-bold text-white mb-2"></h2>
                    <div id="modalTags" class="flex flex-wrap gap-1.5"></div>
                </div>

                <!-- Description -->
                <div>
                    <h4 class="text-xs font-mono uppercase text-slate-400 mb-2 font-bold tracking-wider">
                        <i class="fa-solid fa-align-left text-cyanNeon mr-1"></i> Detalhes & Descrição
                    </h4>
                    <p id="modalDescription" class="text-slate-300 text-sm leading-relaxed bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80 whitespace-pre-line"></p>
                </div>

                <!-- Scientific Citation Section -->
                <div id="modalCitationContainer" class="hidden">
                    <h4 class="text-xs font-mono uppercase text-greenNeon mb-2 font-bold tracking-wider">
                        <i class="fa-solid fa-quote-right mr-1"></i> Citação / Comprovação Científica
                    </h4>
                    <div id="modalCitation" class="text-xs font-mono bg-greenNeon/10 border border-greenNeon/30 text-green-200 p-4 rounded-2xl leading-relaxed italic"></div>
                </div>

                <!-- Code Section -->
                <div id="modalCodeContainer" class="hidden">
                    <h4 class="text-xs font-mono uppercase text-goldWarm mb-2 font-bold tracking-wider">
                        <i class="fa-solid fa-code mr-1"></i> Código / Estrutura Técnica
                    </h4>
                    <pre class="bg-slate-950 p-4 rounded-2xl text-xs font-mono text-cyanNeon border border-slate-800 overflow-x-auto"><code id="modalCode"></code></pre>
                </div>

                <!-- External Links -->
                <div id="modalLinksContainer" class="flex flex-wrap gap-3 pt-2"></div>
            </div>

            <!-- Modal Footer -->
            <div class="px-6 py-4 border-t border-labBorder bg-slate-950/80 flex items-center justify-between">
                <button onclick="deleteCurrentItem()" class="text-xs text-red-400 hover:text-red-300 font-mono flex items-center gap-1">
                    <i class="fa-solid fa-trash"></i> Excluir Registro
                </button>
                <button onclick="closeModal('detailModal')" class="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-mono rounded-xl transition-all">
                    Fechar
                </button>
            </div>
        </div>
    </div>

    <!-- MODAL 2: ADD ITEM MODAL -->
    <div id="addModal" class="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 opacity-0 pointer-events-none transition-opacity duration-300">
        <div class="glass-panel w-full max-w-2xl max-h-[90vh] rounded-3xl border border-labBorder overflow-hidden flex flex-col shadow-2xl">
            
            <div class="px-6 py-4 border-b border-labBorder flex items-center justify-between bg-slate-950/80">
                <h3 class="text-base font-bold text-white flex items-center gap-2">
                    <i class="fa-solid fa-folder-plus text-cyanNeon"></i> Adicionar Nova Criação ao Arquivo
                </h3>
                <button onclick="closeModal('addModal')" class="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-slate-800 transition-all">
                    <i class="fa-solid fa-xmark text-lg"></i>
                </button>
            </div>

            <form id="addForm" onsubmit="handleAddItem(event)" class="p-6 overflow-y-auto space-y-4 flex-1 text-xs">
                <div>
                    <label class="block font-mono text-slate-300 mb-1">Título do Projeto / Estudo *</label>
                    <input type="text" id="addTitle" required class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-cyanNeon" placeholder="Ex: Algoritmo de Crescimento Vegetal em Java">
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label class="block font-mono text-slate-300 mb-1">Categoria *</label>
                        <select id="addCategory" required class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyanNeon">
                            <option value="biologia">Biologia & Ciência</option>
                            <option value="programacao">Programação & Jogos</option>
                            <option value="musica">Música & Escola</option>
                            <option value="livros">Ficção & Livros</option>
                            <option value="artigos">Artigos Científicos</option>
                        </select>
                    </div>
                    <div>
                        <label class="block font-mono text-slate-300 mb-1">Tags (separadas por vírgula)</label>
                        <input type="text" id="addTags" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyanNeon" placeholder="Python, Mitose, Artigo">
                    </div>
                </div>

                <div>
                    <label class="block font-mono text-slate-300 mb-1">Descrição Detalhada *</label>
                    <textarea id="addDescription" required rows="3" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyanNeon" placeholder="Explique os objetivos, processo e resultados do estudo..."></textarea>
                </div>

                <div>
                    <label class="block font-mono text-slate-300 mb-1">Fonte / Citação Científica (Opcional)</label>
                    <input type="text" id="addCitation" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyanNeon" placeholder="Ex: SILVA, M. (2024). Journal of Plant Science, DOI: 10.1016/...">
                </div>

                <div>
                    <label class="block font-mono text-slate-300 mb-1">Código / Anotações Técnicas (Opcional)</label>
                    <textarea id="addCode" rows="3" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs font-mono text-cyanNeon focus:outline-none focus:border-cyanNeon" placeholder="# Insira trechos de código em Python, Java, etc..."></textarea>
                </div>

                <div>
                    <label class="block font-mono text-slate-300 mb-1">Link Externo / GitHub / DOI (Opcional)</label>
                    <input type="url" id="addLink" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyanNeon" placeholder="https://github.com/usuario/projeto">
                </div>

                <div class="pt-4 flex justify-end gap-3 border-t border-labBorder">
                    <button type="button" onclick="closeModal('addModal')" class="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-mono rounded-xl">
                        Cancelar
                    </button>
                    <button type="submit" class="px-5 py-2 bg-cyanNeon text-black font-bold font-mono rounded-xl hover:bg-cyan-400 transition-all shadow-lg shadow-cyanNeon/20">
                        Salvar no Arquivo
                    </button>
                </div>
            </form>
        </div>
    </div>

    <!-- Footer -->
    <footer class="glass-panel border-t border-labBorder mt-16 py-6">
        <div class="max-w-7xl mx-auto px-4 text-center text-xs text-slate-500 font-mono space-y-1">
            <p>© 2026 O Laboratório Digital • Registro Científico, Tecnológico & Musical</p>
            <p class="text-[11px] text-slate-600">Desenvolvido para organizar o conhecimento sem perder a fundamentação acadêmica.</p>
        </div>
    </footer>

    <script>
        // Initial Pre-loaded Projects representing the User's Real Background
        const initialProjects = [
            {
                id: '1',
                title: 'Livro de Ficção Biológica com Citações Científicas Reais',
                category: 'livros',
                tags: ['Livro', 'Ficção', 'Biologia', 'Artigos'],
                date: '2025-08-14',
                description: 'Obra de ficção científica fundamentada na biologia celular e bioinformática. Cada capítulo contém notas de rodapé e citações de artigos científicos reais para consulta investigável.',
                citation: 'REFERÊNCIA BASE: Krebs et al. (2020). Molecular Biology of the Cell. Cap 12: Mecanismos de Reparo de DNA e Mutagênese.',
                code: '// Conceito de Mutação do Livro:\nclass GeneMutado:\n    def __init__(self, sequencia):\n        self.sequencia = sequencia\n    def calcular_fator_mutagenico(self, taxa_radiacao):\n        return len(self.sequencia) * taxa_radiacao',
                link: 'https://github.com'
            },
            {
                id: '2',
                title: 'Simulação da Meia-Vida do DNA vs Jurassic Park em Python',
                category: 'programacao',
                tags: ['Python', 'DNA', 'JurassicPark', 'Biologia'],
                date: '2025-10-20',
                description: 'Script em Python para simular a taxa de degradação do DNA em âmbar ao longo do tempo (meia-vida de 521 anos). Demonstra numericamente a inviabilidade biológica da clonagem de dinossauros extintos há 66 milhões de anos.',
                citation: 'Artigo Comprovatório: ALLENTOFT, M. E. et al. (2012). "The half-life of DNA and structural decay in bone". Proceedings of the Royal Society B.',
                code: 'def calcular_degradacao_dna(anos):\n    meia_vida = 521\n    porcentagem_restante = (0.5) ** (anos / meia_vida)\n    return porcentagem_restante\n\nprint("DNA restante apos 66M anos:", calcular_degradacao_dna(66000000))',
                link: 'https://github.com'
            },
            {
                id: '3',
                title: 'Algoritmos de Ramificação de Raízes em Java',
                category: 'programacao',
                tags: ['Java', 'Botânica', 'Raízes', 'Algoritmos'],
                date: '2025-12-05',
                description: 'Protótipo em Java modelando os padrões matemáticos de busca por umidade em raízes vegetais (hidrotropismo).',
                citation: 'Estudo de apoio: CASSON, S. et al. (2019). "Root system architecture and environmental tropisms". Plant Physiology.',
                code: 'public class RaizVegetal {\n    private double anguloBifurcacao;\n    public void crescer(double umidadeSolo) {\n        this.anguloBifurcacao = umidadeSolo * 0.45;\n    }\n}',
                link: 'https://github.com'
            },
            {
                id: '4',
                title: 'Artigo Científico Publicado & Coautoria Acadêmica',
                category: 'artigos',
                tags: ['Artigo', 'Biologia', 'Coautoria'],
                date: '2024-05-18',
                description: 'Artigo científico publicado em periódico acadêmico focado na análise de dados biológicos e métricas celulares.',
                citation: 'DOI: 10.1016/j.biol.2024.05.012 - "Métricas Analíticas em Sistemas Biológicos Complexos".',
                code: '',
                link: 'https://doi.org'
            },
            {
                id: '5',
                title: 'Estruturação Harmônica & Material Didático para Escola de Música',
                category: 'musica',
                tags: ['Música', 'Piano', 'Teclado', 'Escola'],
                date: '2026-02-01',
                description: 'Mapeamento didático para ensino de harmonização, campo harmônico maior e menor, e condução de vozes para teclado na escola de música.',
                citation: 'Aplicações de acústica musical e teoria harmônica.',
                code: 'Campo Harmônico C Maior:\n[Cmaj7, Dm7, Em7, Fmaj7, G7, Am7, Bm7(b5)]',
                link: ''
            }
        ];

        // State variables
        let projects = [];
        let currentCategory = 'all';
        let searchQuery = '';
        let activeTag = null;
        let selectedProjectId = null;
        let audioCtx = null;

        // Init on page load
        window.addEventListener('DOMContentLoaded', () => {
            loadProjects();
            renderProjects();
            updateStats();
            renderTimeline();
            initMitosisCanvas();
        });

        function loadProjects() {
            const stored = localStorage.getItem('lab_digital_projects_v2');
            if (stored) {
                try { projects = JSON.parse(stored); } catch(e) { projects = initialProjects; }
            } else {
                projects = initialProjects;
                saveProjects();
            }
        }

        function saveProjects() {
            localStorage.setItem('lab_digital_projects_v2', JSON.stringify(projects));
        }

        function showSection(sectionId) {
            ['creations', 'simulations', 'timeline', 'about'].forEach(sec => {
                const el = document.getElementById(`section-${sec}`);
                if (el) el.classList.add('hidden');
            });
            const activeSection = document.getElementById(`section-${sectionId}`);
            if (activeSection) activeSection.classList.remove('hidden');

            document.querySelectorAll('.nav-link').forEach(btn => btn.classList.remove('active-tab'));
            const activeNav = document.getElementById(`nav-${sectionId}`);
            if (activeNav) activeNav.classList.add('active-tab');
        }

        function renderProjects() {
            const grid = document.getElementById('cardsGrid');
            const emptyState = document.getElementById('emptyState');
            grid.innerHTML = '';

            const filtered = projects.filter(p => {
                if (currentCategory !== 'all' && p.category !== currentCategory) return false;
                
                if (searchQuery) {
                    const q = searchQuery.toLowerCase();
                    const mTitle = p.title.toLowerCase().includes(q);
                    const mDesc = p.description.toLowerCase().includes(q);
                    const mCitation = (p.citation || '').toLowerCase().includes(q);
                    const mTag = p.tags.some(t => t.toLowerCase().includes(q));
                    if (!mTitle && !mDesc && !mCitation && !mTag) return false;
                }

                if (activeTag) {
                    if (!p.tags.includes(activeTag)) return false;
                }

                return true;
            });

            if (filtered.length === 0) {
                emptyState.classList.remove('hidden');
                return;
            } else {
                emptyState.classList.add('hidden');
            }

            filtered.forEach(p => {
                grid.appendChild(createProjectCard(p));
            });
        }

        function createProjectCard(item) {
            const div = document.createElement('div');
            div.className = 'glass-card p-5 rounded-3xl flex flex-col justify-between cursor-pointer group';
            div.onclick = () => openDetailModal(item.id);

            const catBadges = {
                biologia: { name: 'Biologia', color: 'bg-greenNeon/10 text-greenNeon border-greenNeon/30', icon: 'fa-dna' },
                programacao: { name: 'Programação', color: 'bg-cyanNeon/10 text-cyanNeon border-cyanNeon/30', icon: 'fa-code' },
                musica: { name: 'Música', color: 'bg-goldWarm/10 text-goldWarm border-goldWarm/30', icon: 'fa-music' },
                livros: { name: 'Ficção/Livro', color: 'bg-purpleNeon/10 text-purpleNeon border-purpleNeon/30', icon: 'fa-book' },
                artigos: { name: 'Artigo', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30', icon: 'fa-file-lines' }
            };

            const cat = catBadges[item.category] || catBadges.biologia;

            const tagsHtml = item.tags.map(t => 
                `<span class="px-2 py-0.5 rounded-lg bg-slate-900/90 text-slate-300 text-[10px] font-mono border border-slate-800">#${t}</span>`
            ).join(' ');

            const citationBadge = item.citation ? 
                `<span class="text-[10px] text-greenNeon font-mono flex items-center gap-1"><i class="fa-solid fa-circle-check"></i> Citação Real</span>` : '';

            div.innerHTML = `
                <div>
                    <div class="flex items-center justify-between mb-3">
                        <span class="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase border ${cat.color} flex items-center gap-1.5 font-semibold">
                            <i class="fa-solid ${cat.icon}"></i> ${cat.name}
                        </span>
                        <span class="text-[10px] text-slate-500 font-mono">${item.date}</span>
                    </div>

                    <h3 class="font-bold text-white text-sm sm:text-base group-hover:text-cyanNeon transition-colors mb-2 line-clamp-2">
                        ${item.title}
                    </h3>

                    <p class="text-xs text-slate-400 line-clamp-3 mb-4 leading-relaxed">
                        ${item.description}
                    </p>
                </div>

                <div>
                    <div class="flex flex-wrap gap-1 mb-3">
                        ${tagsHtml}
                    </div>

                    <div class="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                        ${citationBadge || '<span class="text-[10px] text-slate-500 font-mono">Registro Pessoal</span>'}
                        <span class="text-xs text-cyanNeon font-mono flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                            Ver detalhes <i class="fa-solid fa-arrow-right text-[10px]"></i>
                        </span>
                    </div>
                </div>
            `;

            return div;
        }

        function setCategoryFilter(cat) {
            currentCategory = cat;
            document.querySelectorAll('.cat-btn').forEach(btn => {
                if (btn.dataset.cat === cat) {
                    btn.classList.add('active-tab');
                } else {
                    btn.classList.remove('active-tab');
                }
            });
            renderProjects();
        }

        function handleSearch() {
            searchQuery = document.getElementById('searchInput').value;
            renderProjects();
        }

        function filterByTag(tag) {
            activeTag = tag;
            document.getElementById('clearTagBtn').classList.remove('hidden');
            renderProjects();
        }

        function clearTagFilter() {
            activeTag = null;
            document.getElementById('clearTagBtn').classList.add('hidden');
            renderProjects();
        }

        function updateStats() {
            document.getElementById('stat-total').innerText = projects.length;
            document.getElementById('stat-bio').innerText = projects.filter(p => p.category === 'biologia' || p.category === 'artigos').length;
            document.getElementById('stat-code').innerText = projects.filter(p => p.category === 'programacao').length;
            document.getElementById('stat-music').innerText = projects.filter(p => p.category === 'musica').length;
        }

        function renderTimeline() {
            const container = document.getElementById('timelineContainer');
            container.innerHTML = '';

            const sorted = [...projects].sort((a,b) => new Date(b.date) - new Date(a.date));

            sorted.forEach(p => {
                const item = document.createElement('div');
                item.className = 'relative group cursor-pointer';
                item.onclick = () => { showSection('creations'); openDetailModal(p.id); };

                item.innerHTML = `
                    <div class="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-slate-900 border-2 border-cyanNeon group-hover:scale-125 transition-transform"></div>
                    <div class="glass-panel p-4 rounded-2xl border border-labBorder hover:border-cyanNeon/40 transition-all">
                        <span class="text-[10px] font-mono text-cyanNeon">${p.date}</span>
                        <h4 class="font-bold text-white text-sm mt-0.5">${p.title}</h4>
                        <p class="text-xs text-slate-400 line-clamp-2 mt-1">${p.description}</p>
                    </div>
                `;
                container.appendChild(item);
            });
        }

        function openDetailModal(id) {
            selectedProjectId = id;
            const p = projects.find(item => item.id === id);
            if (!p) return;

            document.getElementById('modalTitle').innerText = p.title;
            document.getElementById('modalDate').innerText = 'Data de Registro: ' + p.date;
            document.getElementById('modalDescription').innerText = p.description;

            const catBadge = document.getElementById('modalCategoryBadge');
            catBadge.innerText = p.category.toUpperCase();
            catBadge.className = 'px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase bg-cyanNeon/20 text-cyanNeon border border-cyanNeon/40';

            const tagsContainer = document.getElementById('modalTags');
            tagsContainer.innerHTML = p.tags.map(t => 
                `<span class="px-2 py-0.5 rounded-lg bg-slate-800 text-slate-300 text-xs font-mono border border-slate-700">#${t}</span>`
            ).join(' ');

            const citationContainer = document.getElementById('modalCitationContainer');
            if (p.citation) {
                document.getElementById('modalCitation').innerText = p.citation;
                citationContainer.classList.remove('hidden');
            } else {
                citationContainer.classList.add('hidden');
            }

            const codeContainer = document.getElementById('modalCodeContainer');
            if (p.code) {
                document.getElementById('modalCode').innerText = p.code;
                codeContainer.classList.remove('hidden');
            } else {
                codeContainer.classList.add('hidden');
            }

            const linksContainer = document.getElementById('modalLinksContainer');
            linksContainer.innerHTML = '';
            if (p.link) {
                linksContainer.innerHTML = `
                    <a href="${p.link}" target="_blank" class="px-4 py-2 rounded-xl bg-cyanNeon/20 hover:bg-cyanNeon/30 text-cyanNeon border border-cyanNeon/40 text-xs font-mono flex items-center gap-2">
                        <i class="fa-brands fa-github"></i> Acessar Repositório / Fonte Externa
                    </a>
                `;
            }

            openModal('detailModal');
        }

        function openModal(id) {
            const m = document.getElementById(id);
            m.classList.remove('opacity-0', 'pointer-events-none');
        }

        function closeModal(id) {
            const m = document.getElementById(id);
            m.classList.add('opacity-0', 'pointer-events-none');
        }

        function deleteCurrentItem() {
            if (!selectedProjectId) return;
            projects = projects.filter(p => p.id !== selectedProjectId);
            saveProjects();
            renderProjects();
            updateStats();
            renderTimeline();
            closeModal('detailModal');
        }

        function handleAddItem(e) {
            e.preventDefault();
            const title = document.getElementById('addTitle').value;
            const category = document.getElementById('addCategory').value;
            const tagsRaw = document.getElementById('addTags').value;
            const description = document.getElementById('addDescription').value;
            const citation = document.getElementById('addCitation').value;
            const code = document.getElementById('addCode').value;
            const link = document.getElementById('addLink').value;

            const tags = tagsRaw ? tagsRaw.split(',').map(t => t.trim()) : [category];

            const newP = {
                id: Date.now().toString(),
                title,
                category,
                tags,
                date: new Date().toISOString().split('T')[0],
                description,
                citation,
                code,
                link
            };

            projects.unshift(newP);
            saveProjects();
            renderProjects();
            updateStats();
            renderTimeline();

            document.getElementById('addForm').reset();
            closeModal('addModal');
        }

        // Export and Import Data
        function exportData() {
            const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(projects, null, 2));
            const downloadAnchor = document.createElement('a');
            downloadAnchor.setAttribute("href", dataStr);
            downloadAnchor.setAttribute("download", `laboratorio_backup_${new Date().toISOString().split('T')[0]}.json`);
            document.body.appendChild(downloadAnchor);
            downloadAnchor.click();
            downloadAnchor.remove();
        }

        function importData(event) {
            const file = event.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = function(e) {
                try {
                    const imported = JSON.parse(e.target.result);
                    if (Array.isArray(imported)) {
                        projects = imported;
                        saveProjects();
                        renderProjects();
                        updateStats();
                        renderTimeline();
                        alert('Backup importado com sucesso!');
                    }
                } catch(err) {
                    alert('Erro ao carregar o arquivo JSON.');
                }
            };
            reader.readAsText(file);
        }

        // SIMULATION 1: WEB AUDIO API DNA TRANSLATOR
        function insertDnaPreset(seq) {
            document.getElementById('dnaInput').value = seq;
        }

        function playDnaSequence() {
            const dna = document.getElementById('dnaInput').value.replace(/[^ATCGatcg]/g, '').toUpperCase();
            const visualizer = document.getElementById('dnaVisualizer');
            visualizer.innerHTML = '';

            if (dna.length === 0) {
                visualizer.innerHTML = `<span class="text-xs text-red-400 font-mono">Sequência inválida! Digite letras A, T, C, G.</span>`;
                return;
            }

            if (!audioCtx) {
                audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            }

            const baseFrequencies = {
                'A': 261.63, // C4
                'T': 329.63, // E4
                'C': 392.00, // G4
                'G': 493.88  // B4
            };

            const colors = {
                'A': 'bg-cyanNeon text-black',
                'T': 'bg-greenNeon text-black',
                'C': 'bg-goldWarm text-black',
                'G': 'bg-purpleNeon text-white'
            };

            let delay = 0;

            for (let i = 0; i < dna.length; i++) {
                const char = dna[i];
                const freq = baseFrequencies[char] || 220;

                setTimeout(() => {
                    const badge = document.createElement('span');
                    badge.className = `px-2.5 py-1 rounded-lg text-xs font-mono font-bold ${colors[char]} animate-bounce`;
                    badge.innerText = char;
                    visualizer.appendChild(badge);

                    playTone(freq, 0.25);
                }, delay);

                delay += 280;
            }
        }

        function playTone(freq, duration) {
            if (!audioCtx) return;
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();

            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

            gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

            osc.connect(gain);
            gain.connect(audioCtx.destination);

            osc.start();
            osc.stop(audioCtx.currentTime + duration);
        }

        // SIMULATION 2: HTML5 CANVAS MITOSIS
        let mitosisCanvas, ctx, animationFrame;

        function initMitosisCanvas() {
            mitosisCanvas = document.getElementById('mitosisCanvas');
            if (!mitosisCanvas) return;
            ctx = mitosisCanvas.getContext('2d');
            resizeMitosisCanvas();
            drawCell(0);
        }

        function resizeMitosisCanvas() {
            if (mitosisCanvas) {
                mitosisCanvas.width = mitosisCanvas.parentElement.clientWidth;
                mitosisCanvas.height = mitosisCanvas.parentElement.clientHeight;
            }
        }

        function drawCell(progress) {
            if (!ctx) return;
            const w = mitosisCanvas.width;
            const h = mitosisCanvas.height;
            const cx = w / 2;
            const cy = h / 2;

            ctx.clearRect(0, 0, w, h);

            if (progress <= 0) {
                // Interphase
                ctx.beginPath();
                ctx.arc(cx, cy, 35, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(0, 240, 255, 0.2)';
                ctx.strokeStyle = '#00F0FF';
                ctx.lineWidth = 2;
                ctx.fill();
                ctx.stroke();

                ctx.beginPath();
                ctx.arc(cx, cy, 14, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(16, 185, 129, 0.7)';
                ctx.fill();
            } else if (progress < 1) {
                // Anaphase
                const sep = progress * 50;

                ctx.beginPath();
                ctx.arc(cx - sep, cy, 28, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(0, 240, 255, 0.2)';
                ctx.strokeStyle = '#00F0FF';
                ctx.fill();
                ctx.stroke();

                ctx.beginPath();
                ctx.arc(cx + sep, cy, 28, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(0, 240, 255, 0.2)';
                ctx.strokeStyle = '#00F0FF';
                ctx.fill();
                ctx.stroke();

                // Chromosomes
                ctx.beginPath();
                ctx.arc(cx - sep, cy, 8, 0, Math.PI * 2);
                ctx.arc(cx + sep, cy, 8, 0, Math.PI * 2);
                ctx.fillStyle = '#F59E0B';
                ctx.fill();
            } else {
                // Telophase
                const sep = 55;
                ctx.beginPath();
                ctx.arc(cx - sep, cy, 26, 0, Math.PI * 2);
                ctx.arc(cx + sep, cy, 26, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(16, 185, 129, 0.2)';
                ctx.strokeStyle = '#10B981';
                ctx.lineWidth = 2;
                ctx.fill();
                ctx.stroke();
            }
        }

        function startMitosis() {
            let p = 0;
            const text = document.getElementById('mitosisPhaseText');

            function animate() {
                p += 0.012;
                if (p < 0.3) text.innerText = "Fase: Prófase / Metáfase";
                else if (p < 0.8) text.innerText = "Fase: Anáfase (Separação)";
                else if (p <= 1) text.innerText = "Fase: Telófase (Duas Células Filhas)";

                drawCell(p);

                if (p < 1) {
                    animationFrame = requestAnimationFrame(animate);
                }
            }
            cancelAnimationFrame(animationFrame);
            animate();
        }

        function resetMitosis() {
            cancelAnimationFrame(animationFrame);
            document.getElementById('mitosisPhaseText').innerText = "Fase: Interfase";
            drawCell(0);
        }

        window.addEventListener('resize', () => {
            resizeMitosisCanvas();
            drawCell(0);
        });
    </script>
</body>
</html>
