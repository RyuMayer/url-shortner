import {useForm} from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { createShortLink, selectLoading } from '../../store/slice/linkSlice';

export function Form() {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);

  const {
    register,
    formState: {errors},
    handleSubmit,
    reset
  } = useForm({
    mode: 'onSubmit'
  });

  const onSubmit = ({Url: url}) => {
    const formData = new FormData();
    formData.append('url', url);

    dispatch(createShortLink(formData));
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      autoComplete="off"
    >
      <div className="row">
        <div className="col-10 has-validation">
          <input
            disabled={loading === 'loading'}
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
          <button
            disabled={loading === 'loading'}
            type="submit"
            className="btn btn-primary w-100"
          >
            Shorten it!
          </button>
        </div>
      </div>
    </form>
  );
}
