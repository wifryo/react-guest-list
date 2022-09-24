import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inputDisabled, setInputDisabled] = useState(true);

  const baseUrl = 'http://localhost:4000';

  async function logGuests() {
    const response = await fetch(`${baseUrl}/guests`);
    const tempGuests = await response.json();
    setGuests(tempGuests);
  }
  async function addGuest() {
    await fetch(`${baseUrl}/guests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        attending: false,
      }),
    });
    await logGuests();
    setFirstName('');
    setLastName('');
  }

  async function handleEnter(event) {
    if (event.key === 'Enter') {
      await addGuest();
    }
  }

  useEffect(() => {
    function fetchGuestsInfo() {
      fetch(`${baseUrl}/guests`)
        .then((res) => res.json())
        .then(
          (result) => {
            setLoading(false);
            setInputDisabled(false);
            setGuests(result);
            console.log('done');
          },

          (err) => {
            setLoading(false);
            setInputDisabled(false);
            console.log(err);
          },
        );
    }
    console.log('loading');
    fetchGuestsInfo();
  }, []);

  async function deleteGuest(id) {
    await fetch(`${baseUrl}/guests/${id}`, {
      method: 'DELETE',
    });
    await logGuests();
  }

  async function setGuestAttendance(id, checkboxResult) {
    await fetch(`${baseUrl}/guests/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ attending: checkboxResult }),
    });
    await logGuests();
  }

  async function deleteAll() {
    const tempArray = guests.map((guest) =>
      fetch(`${baseUrl}/guests/${guest.id}`, {
        method: 'DELETE',
      }),
    );
    await Promise.all(tempArray);
    await logGuests();
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>world of guests</h1>
        <p>premium guest wrangling service </p>
      </header>
      <div>
        <br />
        <div id="data-test-id=guest">
          <form>
            <label className="label" htmlFor="first">
              First name
            </label>
            <input
              disabled={inputDisabled ? 'disabled' : ''}
              id="first"
              value={firstName}
              onClick={() => setFirstName('')}
              onChange={(event) => setFirstName(event.currentTarget.value)}
            />
            <br />
            <label className="label" htmlFor="last">
              Last name
            </label>
            <input
              disabled={inputDisabled ? 'disabled' : ''}
              id="last"
              value={lastName}
              onClick={() => setLastName('')}
              onChange={(event) => setLastName(event.currentTarget.value)}
              onKeyPress={handleEnter}
            />
            <br />
            <br />
          </form>
          {/* <button onClick={() => addGuest()}>Add guest</button>
           */}{' '}
          <button className="deleteButton" onClick={() => deleteAll()}>
            Delete guests (mean!)
          </button>
        </div>
        <p>{loading ? 'loading...' : ''}</p>
        <div>
          {guests.map((guest) => {
            return (
              <div key={guest.id} className="guests">
                <div className="item">{`Name: ${guest.firstName} ${guest.lastName}`}</div>

                <button
                  className="button"
                  onClick={() => deleteGuest(guest.id)}
                >{`Remove ${guest.firstName} ${guest.lastName}`}</button>

                <br />
                <p className="guestAttending">Guest attending: </p>

                <input
                  aria-label="attending"
                  checked={guest.attending}
                  type="checkbox"
                  onChange={(event) =>
                    setGuestAttendance(guest.id, event.currentTarget.checked)
                  }
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
