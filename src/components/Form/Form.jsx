import {useForm} from 'react-hook-form';

export function Form() {
  const {
    register,
    formState: {errors},
    handleSubmit,
    // reset
  } = useForm({
    mode: 'onSubmit'
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      autoComplete="off"
    >
      <div className="row">
        <div className="col-10 has-validation">
          <input
            {...register('Url', {
              required: 'Please add a link'
            })}
            type="text"
            className={'form-control' + (errors.Url ? ' is-invalid' : '')}
            placeholder="Shorten a link here..."
          />
          {errors.Url && (
            <div className="invalid-feedback">
              {errors.Url.message}
            </div>
          )}
        </div>
        <div className="col-2">
          <button type="submit" className="btn btn-primary w-100">Shorten it!</button>
        </div>
      </div>
    </form>
  );
}
