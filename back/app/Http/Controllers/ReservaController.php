<?php

namespace App\Http\Controllers;

use App\Models\Reserva;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ReservaController extends Controller
{
    public function index(Request $request)
    {
        $query = Reserva::query();

        if ($request->has('category')) {
            $query->where('category', $request->input('category'));
        }

        $reservas = $query->get();

        // Adiciona o caminho completo da imagem e evita erro no features
        foreach ($reservas as $reserva) {
            $reserva->image = url('storage/' . $reserva->image);
            $reserva->features = is_string($reserva->features)
                ? json_decode($reserva->features, true)
                : ($reserva->features ?? []);
        }

        return response()->json($reservas);
    }


    public function store(Request $request)
    {
        \Log::info('Dados recebidos:', $request->all());

        // Decodificar o JSON manualmente antes da validação, se necessário
        if ($request->has('features') && is_string($request->features)) {
            $request->merge([
                'features' => json_decode($request->features, true)
            ]);
        }

        $data = $request->validate([
            'title' => 'required|string|max:255',
            'where' => 'required|string|max:255',
            'price' => 'required|numeric',
            'category' => 'required|string|max:255',
            'image' => 'nullable|image|max:2048',
            'features' => 'nullable|array',
            'features.*.name' => 'required|string',
            'features.*.image' => 'required|string',
        ]);

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('images', 'public');
        }

        $data['features'] = json_encode($data['features'] ?? []);

        return Reserva::create($data);
    }


    public function show($id)
    {
        $reserva = Reserva::findOrFail($id);
        $reserva->features = json_decode($reserva->features ?? '[]');
        $reserva->image = url('storage/' . $reserva->image);
        return response()->json($reserva);
    }

    public function update(Request $request, $id)
    {
        $reserva = Reserva::findOrFail($id);

        if ($request->has('features') && is_string($request->features)) {
            $request->merge([
                'features' => json_decode($request->features, true)
            ]);
        }

        $data = $request->validate([
            'title' => 'required|string|max:255',
            'where' => 'required|string|max:255',
            'price' => 'required|numeric',
            'category' => 'required|string|max:255',
            'image' => 'nullable|image|max:2048',
            'features' => 'nullable|array',
            'features.*.name' => 'required|string',
            'features.*.image' => 'required|string',
        ]);

        if ($request->hasFile('image')) {
            if ($reserva->image) {
                Storage::disk('public')->delete($reserva->image);
            }
            $data['image'] = $request->file('image')->store('images', 'public');
        }

        $data['features'] = json_encode($data['features'] ?? []);

        $reserva->update($data);
        return $reserva;
    }

    public function destroy($id)
    {
        $reserva = Reserva::findOrFail($id);
        if ($reserva->image) {
            Storage::disk('public')->delete($reserva->image);
        }
        $reserva->delete();

        return response()->json(['message' => 'Reserva deletada com sucesso']);
    }
}
