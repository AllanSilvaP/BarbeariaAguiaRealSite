<button
    {{ $attributes->merge(
        ['class' => 'bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded'
    ]) }}
>
    {{$slot}}
</button>
