<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Inscription - TaxiGo</title>
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
        <div class="max-w-2xl mx-auto">

            <!-- Logo -->
            <div class="flex justify-center mb-8 animate-fade-in">
                <img src="{{ asset('images/TaxiGo.png') }}" alt="TaxiGo" class="h-32 w-auto drop-shadow-xl">
            </div>

            <!-- Register Card -->
            <div class="flex animate-slide-in items-center justify-center">
                <div class="bg-white rounded-3xl shadow-2xl p-8 md:p-10">

                    <!-- Header -->
                    <div class="text-center mb-8">
                        <h1 class="text-3xl font-bold text-gray-900 mb-2">Créer un compte</h1>
                        <p class="text-gray-600">Rejoignez TaxiGo en quelques secondes</p>
                    </div>

                    <!-- Register Form -->
                    <form class="space-y-5">

                        <!-- Full Name Input -->
                        <div class="flex gap-3">
                            <div>
                                <label for="fullname" class="block text-sm font-semibold text-gray-700 mb-2">
                                    Nom
                                </label>


                                <input type="text" name="nom" placeholder="Votre nom "
                                    class="input-focus w-full p-3  border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none transition-all"
                                    required>

                            </div>
                            <div>
                                <label for="fullname" class="block text-sm font-semibold text-gray-700 mb-2">
                                    Prenom
                                </label>
                                
                                    </svg>
                                    <input type="text" name="prenom" placeholder="Votre prenom"
                                        class="input-focus w-full p-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none transition-all"
                                        required>
                                
                            </div>
                        </div>

                        <div class="flex gap-3">
                            <div>
                                <label for="email" class="block text-sm font-semibold text-gray-700 mb-2">
                                    Adresse e-mail
                                </label>
                                
                                    <input type="email" name="email" placeholder="votre@email.com"
                                        class="input-focus w-full p-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none transition-all"
                                        required>
                                
                            </div>
                            <div>
                                <label for="phone" class="block text-sm font-semibold text-gray-700 mb-2">
                                    Numéro de téléphone
                                </label>
                                
                                    
                                    <input type="tel" name="phone" placeholder="+212 6XX XXX XXX"
                                        class="input-focus w-full p-3  border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none transition-all"
                                        required>
                               
                            </div>

                        </div>


                        <div class="flex gap-3">
                            <div>
                                <label for="password" class="block text-sm font-semibold text-gray-700 mb-2">
                                    Mot de passe
                                </label>
                                
                                    <input type="password" name="password" placeholder="••••••••"
                                        class="input-focus w-full p-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none transition-all"
                                        required>
                               
                            </div>
                            <div>
                                <label for="confirm-password" class="block text-sm font-semibold text-gray-700 mb-2">
                                    Confirmer le mot de passe
                                </label>
                                
                                    <input type="password" name="confirm-password" placeholder="••••••••"
                                        class="input-focus w-full p-3  border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none transition-all"
                                        required>
                                
                            </div>

                        </div>



                        <!-- Terms & Conditions -->
                        <div class="pt-2">
                            <label class="flex items-start cursor-pointer group">
                                <input type="checkbox"
                                    class="w-4 h-4 mt-1 rounded border-gray-300 text-yellow-600 focus:ring-yellow-500 cursor-pointer"
                                    required>
                                <span class="ml-3 text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                                    J'accepte les <a href="/terms"
                                        class="text-yellow-600 hover:text-yellow-700 font-semibold">conditions
                                        d'utilisation</a> et la <a href="/privacy"
                                        class="text-yellow-600 hover:text-yellow-700 font-semibold">politique de
                                        confidentialité</a>
                                </span>
                            </label>
                        </div>

                        <!-- Submit Button -->
                        <button type="submit"
                            class="w-full bg-gradient-to-r from-yellow-500 to-amber-600 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 mt-6">
                            Créer mon compte
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

                    <!-- Social Register Buttons -->
                    <div class="space-y-3">
                        <button
                            class="w-full flex items-center justify-center px-4 py-3.5 border-2 border-gray-200 rounded-xl hover:border-gray-300 hover:bg-gray-50 hover:shadow-md transition-all duration-300 group">
                            <svg class="w-5 h-5 mr-3" viewBox="0 0 24 24">
                                <path fill="#4285F4"
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853"
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05"
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="#EA4335"
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            <span class="text-sm font-semibold text-gray-700 group-hover:text-gray-900">S'inscrire avec
                                Google</span>
                        </button>


                    </div>

                    <!-- Login Link -->
                    <div class="mt-8 pt-6 border-t border-gray-200">
                        <p class="text-center text-gray-600">
                            Vous avez déjà un compte ?
                            <a href="login"
                                class="font-semibold text-yellow-600 hover:text-yellow-700 transition-colors">
                                Se connecter
                            </a>
                        </p>
                    </div>

                </div>
            </div>

        </div>
    </div>

    <script>
        // Form validation
        document.querySelector('form').addEventListener('submit', function (e) {
            e.preventDefault();

            const fullname = document.getElementById('fullname').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;

            // Password match validation
            if (password !== confirmPassword) {
                alert('Les mots de passe ne correspondent pas !');
                return;
            }

            // Basic validation
            if (fullname && email && phone && password) {
                console.log('Register attempt:', { fullname, email, phone, password });
                // Add your registration logic here
                alert('Inscription réussie ! (Démo)');
            }
        });

        // Input animations
        const inputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], input[type="password"]');
        inputs.forEach(input => {
            input.addEventListener('focus', function () {
                this.parentElement.classList.add('scale-[1.01]');
            });

            input.addEventListener('blur', function () {
                this.parentElement.classList.remove('scale-[1.01]');
            });
        });

        // Password strength indicator (optional enhancement)
        const passwordInput = document.getElementById('password');
        passwordInput.addEventListener('input', function () {
            const password = this.value;
            const strength = password.length >= 8 ? 'Fort' : password.length >= 6 ? 'Moyen' : 'Faible';
            console.log('Password strength:', strength);
        });
    </script>
</body>

</html>