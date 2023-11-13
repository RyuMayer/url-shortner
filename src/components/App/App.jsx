import { Form } from '../Form';
import { Shortens } from '../Shortens/Shortens';

export function App() {
  return (
    <div className="container w-50 pt-5">
      <h3>Simple React URL shortening</h3>
      <div className="alert alert-dark">
        <Form />
      </div>
      <Shortens />
    </div>
  );
}
