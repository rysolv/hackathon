import type { NextPage } from 'next'
import { Input, Modal, Text, useModal, Button } from '@nextui-org/react';
import Numbers from '../components/numbers';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import signUpImage from '../public/undraw/sign-up.svg';
import { useRouter } from 'next/router';
import { loader } from '../lib/loader';

const Home: NextPage = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const { setVisible, bindings } = useModal();
  const velocity = useRef({x: 0, y: 0, at: Date.now()});
  const position = useRef({x: 0, y: 0});
  const { push, query } = useRouter();

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      velocity.current = {x: e.movementX, y: e.movementY, at: Date.now()};
      position.current = {x: e.clientX, y: e.clientY};
    };
    const onTouchMove = (e: TouchEvent) => {
      const now = Date.now();
      velocity.current = {
        x: 7 * (e.touches[0].clientX - position.current.x) / (now - velocity.current.at),
        y: 7 * (e.touches[0].clientY - position.current.y) / (now - velocity.current.at),
        at: now,
      };
      position.current = {x: e.touches[0].clientX, y: e.touches[0].clientY};
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('touchmove', onTouchMove);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('touchmove', onTouchMove);
    }
  }, []);

  let allSpeed: (number | {y: number})[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

  const onModalLoad = () => {
    const ACCELERATION = typeof query['acceleration'] === 'string' ? parseFloat(query['acceleration']) : 0.0002;
    const animation = () => {
      let anyUndefined = false;
      allSpeed.forEach((speed, i) => {
        const element = document.getElementById(`phoneNumber-${i}`);
        if (!element) return anyUndefined = true;
        const position = parseFloat(element.style.transform.replace('translateY(', '').replace('px)', '') ||   '0');
        let newPosition = position;

        if (typeof speed === 'object') {
          const position = parseFloat(element.style.transform.replace('translateY(', '').replace('px)', '') ||   '0');
          const changeY = velocity.current.y;
          newPosition = position + changeY;
          velocity.current.y = 0;
        }
        else {
          allSpeed[i] = speed + ACCELERATION;
          newPosition = position + speed;
        }
        
        let perfectPosition = false;
        while (!perfectPosition) {
          const height = element.getBoundingClientRect().height;
          if (newPosition > 0) newPosition = newPosition - height / 2;
          else if (newPosition < height / -2) newPosition = newPosition + height / 2;
          else perfectPosition = true;
          element.style.setProperty('transform', `translateY(${newPosition}px)`);
        }

        const numbersHeight = element.children.item(0)?.getBoundingClientRect().height ?? 106;
        const activeNumberIndex = Math.abs(Math.floor((newPosition / numbersHeight) - 1));
        if (activeNumberIndex === Infinity) return;
        const activeNumber = element.children.item(activeNumberIndex) as HTMLParagraphElement;
        if (activeNumber === null || isNaN(activeNumberIndex)) return;
        activeNumber.classList.add('active');
        const inActiveNumbers = element.querySelectorAll(`.active:not(:nth-child(${activeNumberIndex + 1}))`);
        inActiveNumbers.forEach((e) => {
          e.classList.remove('active');
        })
      })

      if (anyUndefined) {
        allSpeed = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        setVisible(false);
        return;
      }

      requestAnimationFrame(animation);
    };

    setTimeout(() => {
      requestAnimationFrame(animation);
    }, 500);

    const mouseUpEvent = (e: HTMLElementEventMap['mouseup' | 'touchend']) => {
      allSpeed.forEach((speed, i) => {
        if (typeof speed === 'object') allSpeed[i] = velocity.current.y * 2;
      })
    };
    document.addEventListener('mouseup', mouseUpEvent);
    document.addEventListener('touchend', mouseUpEvent);

    allSpeed.forEach((e, i) => {
      const mouseDownEvent = (e: HTMLElementEventMap['mousedown' | 'touchstart']) => {
        const position = parseFloat((e.currentTarget as HTMLDivElement)?.style.transform.replace('translateY(', '').replace('px)', '') ||   '0');
        allSpeed[i] = { y: position };
      };

      setTimeout(() => {
        const element = document.getElementById(`phoneNumber-${i}`);
        element?.addEventListener('mousedown', mouseDownEvent);
        element?.addEventListener('touchstart', mouseDownEvent);
      }, 500)
    })
  }

  const submitCode = () => {
    const phoneNumber = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((e) => {
      const element = document.getElementById(`phoneNumber-${e}`);
      if (!element) return;
      const position = parseFloat(element.style.transform.replace('translateY(', '').replace('px)', '') ||   '0');
      const numbersHeight = element.children.item(0)?.getBoundingClientRect().height ?? 106;
      const activeNumberIndex = Math.abs(Math.floor((position / numbersHeight) - 1));
      const activeNumber = element.children.item(activeNumberIndex) as HTMLParagraphElement;
      return activeNumber.textContent;
    })
    push({pathname: '/verification', query: { 'phone-number': phoneNumber.join('') } });
  }

  return (
    <>
      <main>
        <div style={{height: '1em'}}/>
        <Text h2={true} className='centered' style={{width: '100%'}}>Sign Up</Text>
        <div style={{height: '0.5em'}}/>
        <Text className='centered' style={{width: '100%'}}>Get started phoning your friends today with Phone Number App.</Text>
        <div style={{height: '1em'}}/>
        <div className='standardInputs'>
          <Input clearable={true} labelPlaceholder="First Name" required={true} onChange={(e) => setFirstName(e.currentTarget.value)}/>
          <Input clearable={true} labelPlaceholder="Last Name" required={true} onChange={(e) => setLastName(e.currentTarget.value)}/>
        </div>
        <div style={{height: '0.5em'}}/>
        <Button flat={true} disabled={!firstName || !lastName} className='centered' onPress={() => setVisible(true)}>Proceed</Button>
        <div style={{height: '0.5em'}}/>
        {(!firstName || !lastName) && (
          <Text className='centered' color='error' style={{width: '100%'}}>You must enter your first and last name.</Text>
        )}
        {firstName && lastName && (
          <Text className='centered' color='warning' style={{width: '100%'}}>Please finish the captcha to proceed.</Text>
        )}
        <div style={{height: '3.2em'}}/>
        <div style={{position: 'relative', height: 'calc(16vw + 4em)', maxHeight: '17em'}}>
          <Image loader={loader} src={signUpImage} alt='' layout='fill'/>
        </div>
      </main>
      <Modal
        scroll={true}
        width="50em"
        onOpen={onModalLoad}
        {...bindings}
      >
        <Modal.Header>
          <Text id="modal-title" h3={true}>
            Enter Your Phone Number
          </Text>
        </Modal.Header>
        <Modal.Body>
          <div className='numbersContainer'>
            <Numbers id='0'></Numbers>
            <Numbers id='1'></Numbers>
            <Numbers id='2'></Numbers>
            <Numbers id='3'></Numbers>
            <Numbers id='4'></Numbers>
            <Numbers id='5'></Numbers>
            <Numbers id='6'></Numbers>
            <Numbers id='7'></Numbers>
            <Numbers id='8'></Numbers>
            <Numbers id='9'></Numbers>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button flat={true} onPress={submitCode}>
            Send Verification Code
          </Button>
          <Button flat={true} color="error" onPress={() => setVisible(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Home
