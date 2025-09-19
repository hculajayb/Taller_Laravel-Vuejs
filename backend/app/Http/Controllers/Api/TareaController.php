<?php

namespace App\Http\Controllers\Api;

use App\Models\Tarea;
use App\Models\Usuario;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Exports\TareasPendientesExport;
use Maatwebsite\Excel\Facades\Excel;

class TareaController extends Controller
{
    // Exportar tareas pendientes a Excel
    public function exportPendientes()
    {
        return Excel::download(new TareasPendientesExport, 'tareas_pendientes.xlsx');
    }

    //  Listar todas las tareas con usuario
    public function index()
    {
        $tareas = Tarea::with('usuario:id,nombre,email,rol')
            ->select('id', 'titulo', 'descripcion', 'estado', 'fecha_vencimiento', 'usuario_id', 'created_at')
            ->get();

        return response()->json($tareas);
    }

    // Crear nueva tarea asignada a un usuario
    public function store(Request $request)
    {
        $request->validate([
            'titulo' => 'required|string|max:255',
            'descripcion' => 'nullable|string',
            'estado' => 'in:pendiente,en_progreso,completada',
            'fecha_vencimiento' => 'nullable|date',
            'usuario_id' => 'required|exists:usuarios,id',
        ]);

        $tarea = Tarea::create($request->all());

        return response()->json([
            'message' => 'Tarea creada correctamente',
            'tarea'   => $tarea->load('usuario:id,nombre,email'),
        ], 201);
    }

    // Mostrar una tarea en específico
    public function show($id)
    {
        $tarea = Tarea::with('usuario:id,nombre,email')->findOrFail($id);
        return response()->json($tarea);
    }

    // Actualizar tarea
    public function update(Request $request, $id)
    {
        $tarea = Tarea::findOrFail($id);

        $request->validate([
            'titulo' => 'sometimes|required|string|max:255',
            'descripcion' => 'nullable|string',
            'estado' => 'in:pendiente,en_progreso,completada',
            'fecha_vencimiento' => 'nullable|date',
            'usuario_id' => 'sometimes|required|exists:usuarios,id',
        ]);

        $tarea->update($request->all());

        return response()->json([
            'message' => 'Tarea actualizada correctamente',
            'tarea'   => $tarea->load('usuario:id,nombre,email'),
        ]);
    }

    // Eliminar tarea
    public function destroy($id)
    {
        $tarea = Tarea::findOrFail($id);
        $tarea->delete();

        return response()->json(['message' => 'Tarea eliminada correctamente']);
    }
}
