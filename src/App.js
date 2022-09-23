import './App.css';
import { useState } from 'react';

function App() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [guests, setGuests] = useState([]);
  const [isAttending, setIsAttending] = useState(false);

  const baseUrl = 'http://localhost:4000';
  const handleEnter = (event) => {
    if (event.key === 'Enter') {
      addGuest();
    }
  };

  /* function addGuest() {
    const newGuest = {
      firstName: firstName,
      lastName: lastName,
      isAttending: isAttending,
      id: Math.random().toPrecision(5),
    };
    //console.log(newGuest);
    const newState = [newGuest, ...guests];
    setGuests(newState);
    setFirstName('');
    setLastName('');
    setIsAttending(false);
  } */

  async function addGuest() {
    const response = await fetch(`${baseUrl}/guests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        attending: isAttending,
      }),
    });
    logGuests();
  }
  async function logGuests() {
    const response = await fetch(`${baseUrl}/guests`);
    const tempGuests = await response.json();
    setGuests(tempGuests);
    console.log(tempGuests);
  }

  async function deleteGuest(id) {
    const response = await fetch(`${baseUrl}/guests/${id}`, {
      method: 'DELETE',
    });
    setGuests(await response.json());
  }

  async function setGuestAttendance(id, event) {
    console.log('guest id', id);
    const response = await fetch(`${baseUrl}/guests/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ attending: event.currentTarget.checked }),
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
        <h1>wabsite</h1>
        <p>ha ha, welcome </p>
      </header>
      <div>
        <br />
        <div id="data-test-id=guest">
          <form>
            <label htmlFor="first">First name</label>
            <input
              id="first"
              value={firstName}
              onClick={() => setFirstName('')}
              onChange={(event) => setFirstName(event.currentTarget.value)}
            />
            <label htmlFor="last">Last name</label>
            <input
              id="last"
              value={lastName}
              onClick={() => setLastName('')}
              onChange={(event) => setLastName(event.currentTarget.value)}
              onKeyPress={handleEnter}
            />
            <br />
          </form>
          <button onClick={() => addGuest()}>Add guest</button>
          <button onClick={() => logGuests()}>Log guests</button>
          <button onClick={() => deleteAll()}>Delete guests (mean!)</button>
        </div>
        <br />
        Wow, your guest's name is {firstName} {lastName}? bit weird
        <div>
          {guests.map((guest, index) => {
            //console.log(index, 'index');
            return (
              <div key={guest.id}>
                <h3>{`Name: ${guest.firstName} ${guest.lastName}`}</h3>
                <p>Guest attending: {guest.isAttending ? 'yes' : 'no'}</p>
                <button
                  onClick={() => deleteGuest(guest.id)}
                >{`Remove ${guest.firstName} ${guest.lastName}`}</button>
                {/* <button onClick={() => setGuestAttendance(guest.id)}>
                  guest attendance test
                </button> */}
                <br />
                <input
                  checked={guest.isAttending}
                  type="checkbox"
                  onChange={(event) => setGuestAttendance(guest.id, event)}
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
