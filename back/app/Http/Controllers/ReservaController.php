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
    
        // Verifica se a categoria foi passada como parâmetro
        if ($request->has('category')) {
            $query->where('category', $request->input('category'));
        } else {
            $reservas = Reserva::all();
        }
    
        $reservas = $query->get();
    
        // Adiciona o caminho completo da imagem
        foreach ($reservas as $reserva) {
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
        $reserva->image = url('storage/' . $reserva->image);
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
