<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TaxiGo - Réservation de Taxi au Maroc</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }

            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateX(-30px);
            }

            to {
                opacity: 1;
                transform: translateX(0);
            }
        }

        .animate-fade-in {
            animation: fadeIn 1s ease-out;
        }

        .animate-slide-in {
            animation: slideIn 0.8s ease-out;
        }

        .animate-delay-1 {
            animation-delay: 0.2s;
            animation-fill-mode: both;
        }

        .animate-delay-2 {
            animation-delay: 0.4s;
            animation-fill-mode: both;
        }

        .animate-delay-3 {
            animation-delay: 0.6s;
            animation-fill-mode: both;
        }

        /* Scroll effect for navbar */
        .nav-scrolled {
            padding-top: 0.5rem;
            padding-bottom: 0.5rem;
        }

        .nav-scrolled .logo-big {
            transform: scale(0);
            opacity: 0;
            height: 0;
            padding: 0;
            margin: 0;
            pointer-events: none;
        }

        .nav-scrolled .logo-small {
            opacity: 1;
            pointer-events: all;
        }

        .logo-big {
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .logo-small {
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            opacity: 0;
            pointer-events: none;
        }
    </style>
</head>

<body class="bg-gradient-to-br from-yellow-50 via-white to-amber-50">
    <!-- Navigation -->
    <nav id="navbar" class="fixed w-full z-50 bg-white/95 backdrop-blur-md shadow-lg transition-all duration-300">
        <div class="max-w-7xl mx-auto px-6">

            <div class="flex items-center justify-between h-24">

                <div class="logo-big flex items-center space-x-3">
                    <img src="{{ asset('images/TaxiGo.png') }}" alt="TaxiGo" class="h-24 w-auto">
                    
                </div>

                <!-- Center Menu -->
                <div class="hidden md:flex items-center justify-center space-x-12 absolute left-1/2 transform -translate-x-1/2">
                    <a href="#services" class="text-base font-semibold text-gray-700 hover:text-yellow-600 transition-colors relative group py-2">
                        Services
                        <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-500 to-amber-600 transition-all duration-300 group-hover:w-full"></span>
                    </a>
                    <a href="#cities" class="text-base font-semibold text-gray-700 hover:text-yellow-600 transition-colors relative group py-2">
                        Villes
                        <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-500 to-amber-600 transition-all duration-300 group-hover:w-full"></span>
                    </a>
                    <a href="#features" class="text-base font-semibold text-gray-700 hover:text-yellow-600 transition-colors relative group py-2">
                        Avantages
                        <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-500 to-amber-600 transition-all duration-300 group-hover:w-full"></span>
                    </a>
                </div>

                <!-- Right: Auth Buttons -->
                <div class="hidden md:flex items-center space-x-4">
                    <a href="login.html"
                        class="px-7 py-2.5 rounded-full border-2 border-yellow-500 text-yellow-600 font-semibold hover:bg-yellow-50 hover:border-yellow-600 transition-all duration-300">
                        Connexion
                    </a>
                    <a href="inscription.html"
                        class="px-7 py-2.5 rounded-full bg-gradient-to-r from-yellow-500 to-amber-600 text-white font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300">
                        Inscription
                    </a>
                </div>

                <!-- Mobile Menu Button -->
                <button id="menuBtn" class="md:hidden text-gray-700 hover:text-yellow-600 transition-colors">
                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>

            </div>
            

        </div>

        <!-- Mobile Menu -->
        <div id="mobileMenu" class="hidden md:hidden bg-white/98 backdrop-blur-md border-t border-gray-200 shadow-2xl">
            <div class="px-6 py-8 space-y-6">

                <a href="#services" class="block text-lg font-semibold text-gray-700 hover:text-yellow-600 hover:translate-x-2 transition-all duration-300 py-2">Services</a>
                <a href="#cities" class="block text-lg font-semibold text-gray-700 hover:text-yellow-600 hover:translate-x-2 transition-all duration-300 py-2">Villes</a>
                <a href="#features" class="block text-lg font-semibold text-gray-700 hover:text-yellow-600 hover:translate-x-2 transition-all duration-300 py-2">Avantages</a>

                <div class="pt-6 space-y-4 border-t border-gray-200">
                    <a href="/login"
                        class="block w-full text-center px-8 py-3.5 rounded-full border-2 border-yellow-500 text-yellow-600 font-semibold hover:bg-yellow-50 hover:border-yellow-600 transition-all duration-300">
                        Connexion
                    </a>
                    <a href="/register"
                        class="block w-full text-center px-8 py-3.5 rounded-full bg-gradient-to-r from-yellow-500 to-amber-600 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                        Inscription
                    </a>
                </div>

            </div>
        </div>
    </nav>



    <!-- Hero Section -->
    <section class="pt-48 pb-20 px-4 sm:px-6 lg:px-8">
        <div class="max-w-7xl mx-auto">
            <div class="grid md:grid-cols-2 gap-12 items-center">
                <div class="space-y-8 animate-slide-in">
                    <h1 class="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                        Votre Taxi <span
                            class="bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent">en un
                            clic</span>
                    </h1>
                    <p class="text-xl text-gray-600 leading-relaxed">
                        Réservez votre taxi partout au Maroc. Rapide, sûr et fiable. Disponible 24h/24 dans toutes les
                        grandes villes.
                    </p>

                    <!-- Booking Form -->
                   
                    
                </div>

                <div class="hidden md:block animate-fade-in animate-delay-1">
                    <img src="https://main-taxi-frankfurt.de/wp-content/uploads/2024/12/Taxi-Festpreise-Frankfurt-1-768x512.png"
                        alt="Taxi Morocco" class="rounded-2xl shadow-2xl">
                </div>
            </div>
        </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div class="max-w-7xl mx-auto">
            <div class="text-center mb-16">
                <h2 class="text-4xl font-bold text-gray-900 mb-4">Pourquoi choisir TaxiGo ?</h2>
                <p class="text-xl text-gray-600">Le meilleur service de taxi au Maroc</p>
            </div>

            <div class="grid md:grid-cols-4 gap-8">
                <div
                    class="text-center p-6 rounded-xl hover:shadow-xl transition-all transform hover:scale-105 animate-fade-in">
                    <div
                        class="bg-gradient-to-br from-yellow-500 to-amber-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                        </svg>
                    </div>
                    <h3 class="text-xl font-semibold mb-2">Rapide</h3>
                    <p class="text-gray-600">Réservation en 30 secondes, taxi disponible en 5 minutes</p>
                </div>

                <div
                    class="text-center p-6 rounded-xl hover:shadow-xl transition-all transform hover:scale-105 animate-fade-in animate-delay-1">
                    <div
                        class="bg-gradient-to-br from-yellow-500 to-amber-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z">
                            </path>
                        </svg>
                    </div>
                    <h3 class="text-xl font-semibold mb-2">Sécurisé</h3>
                    <p class="text-gray-600">Chauffeurs vérifiés et véhicules contrôlés</p>
                </div>

                <div
                    class="text-center p-6 rounded-xl hover:shadow-xl transition-all transform hover:scale-105 animate-fade-in animate-delay-2">
                    <div
                        class="bg-gradient-to-br from-yellow-500 to-amber-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z">
                            </path>
                        </svg>
                    </div>
                    <h3 class="text-xl font-semibold mb-2">Paiement facile</h3>
                    <p class="text-gray-600">Carte bancaire, cash ou paiement mobile</p>
                </div>

                <div
                    class="text-center p-6 rounded-xl hover:shadow-xl transition-all transform hover:scale-105 animate-fade-in animate-delay-3">
                    <div
                        class="bg-gradient-to-br from-yellow-500 to-amber-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z">
                            </path>
                        </svg>
                    </div>
                    <h3 class="text-xl font-semibold mb-2">Qualité 5★</h3>
                    <p class="text-gray-600">Service client primé disponible 24/7</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Cities Section -->
    <section id="cities" class="py-20 px-4 sm:px-6 lg:px-8">
        <div class="max-w-7xl mx-auto">
            <div class="text-center mb-16">
                <h2 class="text-4xl font-bold text-gray-900 mb-4">Disponible dans tout le Maroc</h2>
                <p class="text-xl text-gray-600">Présent dans plus de 20 villes</p>
            </div>

            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div
                    class="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 text-center">
                    <h3 class="text-lg font-semibold text-gray-900">Casablanca</h3>
                    <p class="text-yellow-600 text-sm">Disponible 24/7</p>
                </div>
                <div
                    class="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 text-center">
                    <h3 class="text-lg font-semibold text-gray-900">Rabat</h3>
                    <p class="text-yellow-600 text-sm">Disponible 24/7</p>
                </div>
                <div
                    class="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 text-center">
                    <h3 class="text-lg font-semibold text-gray-900">Marrakech</h3>
                    <p class="text-yellow-600 text-sm">Disponible 24/7</p>
                </div>
                <div
                    class="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 text-center">
                    <h3 class="text-lg font-semibold text-gray-900">Fès</h3>
                    <p class="text-yellow-600 text-sm">Disponible 24/7</p>
                </div>
                <div
                    class="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 text-center">
                    <h3 class="text-lg font-semibold text-gray-900">Tanger</h3>
                    <p class="text-yellow-600 text-sm">Disponible 24/7</p>
                </div>
                <div
                    class="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 text-center">
                    <h3 class="text-lg font-semibold text-gray-900">Agadir</h3>
                    <p class="text-yellow-600 text-sm">Disponible 24/7</p>
                </div>
                <div
                    class="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 text-center">
                    <h3 class="text-lg font-semibold text-gray-900">Tétouan</h3>
                    <p class="text-yellow-600 text-sm">Disponible 24/7</p>
                </div>
                <div
                    class="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 text-center">
                    <h3 class="text-lg font-semibold text-gray-900">Oujda</h3>
                    <p class="text-yellow-600 text-sm">Disponible 24/7</p>
                </div>
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-yellow-500 to-amber-600">
        <div class="max-w-4xl mx-auto text-center">
            <h2 class="text-4xl font-bold text-white mb-6">Prêt à partir ?</h2>
            <p class="text-xl text-white/90 mb-8">Téléchargez l'application TaxiGo et profitez de votre première course
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                    class="bg-white text-yellow-600 px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl transform hover:scale-105 transition-all">
                    📱 App Store
                </button>
                <button
                    class="bg-white text-yellow-600 px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl transform hover:scale-105 transition-all">
                    🤖 Google Play
                </button>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
            <div>
                <div class="logo-big flex items-center space-x-3">
                    <img src="/image/TaxiGo.png" alt="TaxiGo" class="h-24 w-auto">
                    
                </div>
                <p class="text-gray-400">Votre partenaire de confiance pour vos déplacements au Maroc</p>
            </div>

            <div>
                <h3 class="font-semibold mb-4">Services</h3>
                <ul class="space-y-2 text-gray-400">
                    <li><a href="#" class="hover:text-white">Réservation</a></li>
                    <li><a href="#" class="hover:text-white">Courses longues</a></li>
                    <li><a href="#" class="hover:text-white">Aéroport</a></li>
                    <li><a href="#" class="hover:text-white">Entreprises</a></li>
                </ul>
            </div>

            <div>
                <h3 class="font-semibold mb-4">Société</h3>
                <ul class="space-y-2 text-gray-400">
                    <li><a href="#" class="hover:text-white">À propos</a></li>
                    <li><a href="#" class="hover:text-white">Carrières</a></li>
                    <li><a href="#" class="hover:text-white">Devenir chauffeur</a></li>
                    <li><a href="#" class="hover:text-white">Contact</a></li>
                </ul>
            </div>

            <div>
                <h3 class="font-semibold mb-4">Suivez-nous</h3>
                <div class="flex space-x-4">
                    <a href="#"
                        class="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-yellow-600 transition-colors">f</a>
                    <a href="#"
                        class="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-yellow-600 transition-colors">𝕏</a>
                    <a href="#"
                        class="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-yellow-600 transition-colors">in</a>
                </div>
            </div>
        </div>

        <div class="max-w-7xl mx-auto mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; 2026 TaxiGo. Tous droits réservés.</p>
        </div>
    </footer>

    <script>
        // Mobile menu toggle
        const menuBtn = document.getElementById('menuBtn');
        const mobileMenu = document.getElementById('mobileMenu');
        const navbar = document.getElementById('navbar');

        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

       
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                    mobileMenu.classList.add('hidden');
                }
            });
        });
    </script>
</body>

</html>