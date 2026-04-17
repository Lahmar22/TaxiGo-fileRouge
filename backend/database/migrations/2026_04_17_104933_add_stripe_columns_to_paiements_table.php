<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('paiements', function (Blueprint $table) {
            $table->string('payment_method_id')->nullable()->after('mode_paiement');
            $table->string('stripe_payment_intent_id')->nullable()->after('payment_method_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('paiements', function (Blueprint $table) {
            $table->dropColumn('payment_method_id');
            $table->dropColumn('stripe_payment_intent_id');
        });
    }
};
