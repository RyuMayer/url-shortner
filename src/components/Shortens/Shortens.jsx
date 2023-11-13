import { useSelector } from 'react-redux';

import { selectLinks } from '../../store/slice/linkSlice';

function Shortens() {

  const links = useSelector(selectLinks);

  if (!links.length) return null;

  console.log('here', links);

  return (
    <>
      {links.map((link, idx) => (
        <div key={idx} className="card">
          <div className="card-body">
            {link.link} - {link.shortenLink}
          </div>
        </div>
      )) }
    </>
  );
}

export {Shortens};
