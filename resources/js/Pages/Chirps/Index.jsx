import React from 'react'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import InputError from '@/Components/InputError'
import PrimaryButton from '@/Components/PrimaryButton'
import { useForm, Head } from '@inertiajs/inertia-react'
import Chirp from '@/Components/Chirp'

export default function Index({auth, chirps}) {

    const { data, setData, post, processing, errors, reset } = useForm({
        body: ''
    });

    const submit = e => {
        e.preventDefault();
        post(route('chirps.store'), {onSuccess: () => reset()});
    };


  return (
    <Authenticated auth={auth}>
        <Head title="Chirps" />

        <div className='max-w-2xl mx-auto p-4 sm:p-6 lg:p-8'>
            <form onSubmit={submit}>
                <textarea
                    value={data.body}
                    placeholder="apa yang kamu pikirkan?"
                    className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                    onChange={e => setData('body', e.target.value)}
                >
                </textarea>
                <InputError message={errors.body} className="mt-2" />
                <PrimaryButton className='mt-4'disabled={processing}>Chirp</PrimaryButton>
            </form>

            <div className="mt-6 bg-white shadow-sm rounded-lg divide-y">
                {chirps.map(chirp =>
                    <Chirp key={chirp.id} chirp={chirp} />
                )}
            </div>
        </div>
    </Authenticated>
  )
}
