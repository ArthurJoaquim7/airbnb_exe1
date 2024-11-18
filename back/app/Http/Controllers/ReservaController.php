<?php

namespace App\Http\Controllers;
use App\Models\Reserva;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ReservaController extends Controller
{
    public function index()
    {
        $reservas = Reserva::all();

        foreach ($reservas as $reserva) {
            // Constrói o caminho completo para cada imagem
            $reserva->image = url('storage/' . $reserva->image);
        }
        return response()->json($reservas);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'where' => 'required|string|max:255',
            'price' => 'required|numeric',
            'category' => 'required|string|max:255',
            'image' => 'nullable|image|max:2048'
        ]);

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('images', 'public');
        }

        return Reserva::create($data);
    }

    public function show($id)
    {
        $reserva = Reserva::findOrFail($id);
        $reserva->image = url('uploads/' . $reserva->image); // Ajuste o caminho conforme necessário
        return response()->json($reserva);
    }

    public function update(Request $request, $id)
    {
        $reserva = Reserva::findOrFail($id);
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'where' => 'required|string|max:255',
            'price' => 'required|numeric',
            'category' => 'required|string|max:255',
            'image' => 'nullable|image|max:2048'
        ]);

        if ($request->hasFile('image')) {
            if ($reserva->image) {
                Storage::disk('public')->delete($reserva->image);
            }
            $data['image'] = $request->file('image')->store('images', 'public');
        }

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
