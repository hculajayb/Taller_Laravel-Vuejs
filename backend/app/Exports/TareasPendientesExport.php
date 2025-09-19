<?php

namespace App\Exports;

use App\Models\Tarea;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class TareasPendientesExport implements FromCollection, WithHeadings
{
    public function collection()
    {
        return Tarea::with('usuario')
            ->where('estado', 'pendiente')
            ->get()
            ->map(function ($tarea) {
                return [
                    'ID' => $tarea->id,
                    'Título' => $tarea->titulo,
                    'Descripción' => $tarea->descripcion,
                    'Usuario' => $tarea->usuario->nombre ?? 'N/A',
                    'Email Usuario' => $tarea->usuario->email ?? 'N/A',
                    'Fecha Vencimiento' => $tarea->fecha_vencimiento,
                    'Fecha Creación' => $tarea->created_at->format('d/m/Y H:i'),
                ];
            });
    }

    public function headings(): array
    {
        return [
            'ID',
            'Título',
            'Descripción',
            'Usuario',
            'Email Usuario',
            'Fecha Vencimiento',
            'Fecha Creación',
        ];
    }
}
