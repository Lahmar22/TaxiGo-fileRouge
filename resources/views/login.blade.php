<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Connexion - TaxiGo</title>
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
            animation: fadeIn 0.8s ease-out;
        }

        .animate-slide-in {
            animation: slideIn 0.6s ease-out;
        }

        .input-focus {
            transition: all 0.3s ease;
        }

        .input-focus:focus {
            transform: translateY(-2px);
        }
    </style>
</head>

<body class="bg-gradient-to-br from-yellow-50 via-white to-amber-50 min-h-screen flex items-center justify-center">
    
    <!-- Main Content -->
    <div class="py-12 px-4 sm:px-6 lg:px-8 w-full">
        <div class="max-w-md mx-auto">
            
            <!-- Logo -->
            <div class="flex justify-center mb-8 animate-fade-in">
                <img src="{{ asset('images/TaxiGo.png') }}" alt="TaxiGo" class="h-32 w-auto drop-shadow-xl">
            </div>
            
            <!-- Login Card -->
            <div class="animate-slide-in">
                <div class="bg-white rounded-3xl shadow-2xl p-8 md:p-10">
                    
                    <!-- Header -->
                    <div class="text-center mb-8">
                        <h1 class="text-3xl font-bold text-gray-900 mb-2">Bienvenue !</h1>
                        <p class="text-gray-600">Connectez-vous pour réserver votre taxi</p>
                    </div>

                    <!-- Login Form -->
                    <form class="space-y-5">
                        
                        <!-- Email Input -->
                        <div>
                            <label for="email" class="block text-sm font-semibold text-gray-700 mb-2">
                                Adresse e-mail
                            </label>
                            <div class="relative group">
                                <svg class="w-5 h-5 absolute left-4 top-4 text-gray-400 group-focus-within:text-yellow-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path>
                                </svg>
                                <input 
                                    type="email" 
                                    id="email" 
                                    placeholder="votre@email.com"
                                    class="input-focus w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none transition-all"
                                    required
                                >
                            </div>
                        </div>

                        <!-- Password Input -->
                        <div>
                            <label for="password" class="block text-sm font-semibold text-gray-700 mb-2">
                                Mot de passe
                            </label>
                            <div class="relative group">
                                <svg class="w-5 h-5 absolute left-4 top-4 text-gray-400 group-focus-within:text-yellow-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                                </svg>
                                <input 
                                    type="password" 
                                    id="password" 
                                    placeholder="••••••••"
                                    class="input-focus w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none transition-all"
                                    required
                                >
                            </div>
                        </div>

                        <!-- Remember & Forgot -->
                        <div class="flex items-center justify-between pt-2">
                            <label class="flex items-center cursor-pointer group">
                                <input type="checkbox" class="w-4 h-4 rounded border-gray-300 text-yellow-600 focus:ring-yellow-500 cursor-pointer">
                                <span class="ml-2 text-sm text-gray-600 group-hover:text-gray-900 transition-colors">Se souvenir de moi</span>
                            </label>
                            <a href="/forgot-password" class="text-sm font-semibold text-yellow-600 hover:text-yellow-700 transition-colors">
                                Mot de passe oublié ?
                            </a>
                        </div>

                        <!-- Submit Button -->
                        <button 
                            type="submit"
                            class="w-full bg-gradient-to-r from-yellow-500 to-amber-600 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 mt-6"
                        >
                            Se connecter
                        </button>
                    </form>

                    <!-- Divider -->
                    <div class="relative my-8">
                        <div class="absolute inset-0 flex items-center">
                            <div class="w-full border-t border-gray-200"></div>
                        </div>
                        <div class="relative flex justify-center text-sm">
                            <span class="px-4 bg-white text-gray-500 font-medium">Ou</span>
                        </div>
                    </div>

                    <!-- Social Login Buttons -->
                    <div class="space-y-3">
                        <button class="w-full flex items-center justify-center px-4 py-3.5 border-2 border-gray-200 rounded-xl hover:border-gray-300 hover:bg-gray-50 hover:shadow-md transition-all duration-300 group">
                            <svg class="w-5 h-5 mr-3" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                            </svg>
                            <span class="text-sm font-semibold text-gray-700 group-hover:text-gray-900">Continuer avec Google</span>
                        </button>
                        
                        
                    </div>

                    <!-- Sign Up Link -->
                    <div class="mt-8 pt-6 border-t border-gray-200">
                        <p class="text-center text-gray-600">
                            Vous n'avez pas de compte ? 
                            <a href="inscription" class="font-semibold text-yellow-600 hover:text-yellow-700 transition-colors">
                                Créer un compte
                            </a>
                        </p>
                    </div>
                    
                </div>
            </div>

        </div>
    </div>

    <script>
        // Form validation
        document.querySelector('form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // Basic validation
            if (email && password) {
                console.log('Login attempt:', { email, password });
                // Add your login logic here
                alert('Connexion réussie ! (Démo)');
            }
        });

        // Input animations
        const inputs = document.querySelectorAll('input[type="email"], input[type="password"]');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('scale-[1.01]');
            });
            
            input.addEventListener('blur', function() {
                this.parentElement.classList.remove('scale-[1.01]');
            });
        });
    </script>
</body>

</html>