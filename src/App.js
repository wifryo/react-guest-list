import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(true);

  const baseUrl = 'http://localhost:4000';
  const handleEnter = (event) => {
    if (event.key === 'Enter') {
      addGuest();
    }
  };

  /*   useEffect(() => {
    logGuests().catch(() => {});
  }, []); */

  /*  useEffect(() => {
    setLoading(true);
    fetch(`${baseUrl}/guests`)
      .then((res) => res.json())
      .then((data) => {
        setGuests(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    //return <LoadingComponent />;
    console.log('loading');
  }

  //return <MyRegularComponent />;
  console.log('done'); */

  useEffect(() => {
    function fetchGuestsInfo() {
      fetch(`${baseUrl}/guests`)
        .then((res) => res.json())
        .then(
          (result) => {
            setLoading(false);
            setGuests(result);
            console.log('done');
          },

          (err) => {
            setLoading(false);
            // setErrorMessage(err);
            console.log(err);
          },
        );
    }
    console.log('loading');
    fetchGuestsInfo();
  }, []);

  async function addGuest() {
    const response = await fetch(`${baseUrl}/guests`, {
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
    logGuests();
    setFirstName('');
    setLastName('');
  }
  async function logGuests() {
    const response = await fetch(`${baseUrl}/guests`);
    const tempGuests = await response.json();
    setGuests(tempGuests);
    console.log(tempGuests);
  }

  async function deleteGuest(id) {
    await fetch(`${baseUrl}/guests/${id}`, {
      method: 'DELETE',
    });
    logGuests();
  }

  async function setGuestAttendance(id, checkboxResult) {
    const response = await fetch(`${baseUrl}/guests/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ attending: checkboxResult }),
    });
    const updatedGuest = await response.json();
    console.log(updatedGuest);
  }

  async function deleteAll() {
    const tempArray = guests.map((guest) =>
      fetch(`${baseUrl}/guests/${guest.id}`, {
        method: 'DELETE',
      }),
    );
    await Promise.all(tempArray);
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
        {/* <br />
        Wow, your guest's name is {firstName} {lastName}? bit weird
        <br /> */}
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
                  checked={guest.isAttending}
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
