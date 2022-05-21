import { Input, Text, Tooltip } from "@nextui-org/react";
import { useRouter } from "next/router";
import Image from 'next/image';
import messageImage from '../public/undraw/messages.svg';
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { loader } from "../lib/loader";

const Verification = () => {
	const { query } = useRouter();

	return (
		<>
			<main>
        <div style={{height: '1em'}}/>
				<Text h2={true} className='centered' style={{width: '100%'}}>Verify Your Phone Number</Text>
        <div style={{height: '0.5em'}}/>
				<Text className='centered' style={{width: '60%', margin: 'auto'}}>Please verify this is your number by entering the 6 digit code we sent to +1 {query['phone-number']}.</Text>
        <div style={{height: '3em'}}/>
				<div style={{display: 'flex', justifyContent: 'center'}}>
					<Tooltip content={'Don\'t worry, we did not really send a 6 digit code.'} color='invert'>
						<Input clearable={true} labelPlaceholder="6 Digit Code" required={true}/>
					</Tooltip>
				</div>
				<div style={{height: '3.2em'}}/>
				<div style={{position: 'relative', height: 'calc(16vw + 4em)', maxHeight: '17em'}}>
          <Image loader={loader} src={messageImage} alt='' layout='fill'/>
        </div>
				<div style={{height: '3.2em'}}/>
				<Text h4={true} className='centered'>Sign In Again?</Text>
				<div style={{height: '0.5em'}}/>
				<div style={{display: 'flex', justifyContent: 'center'}}>
					<Button.Group flat={true}>
						<Link passHref={true} href='/?acceleration=0'>
							<Button>Easy</Button>
						</Link>
						<Link passHref={true} href='/?acceleration=0.0002'>
							<Button>Normal</Button>
						</Link>
						<Link passHref={true} href='/?acceleration=0.03'>
							<Button>Hard</Button>
						</Link>
					</Button.Group>
				</div>
				<div style={{height: '2em'}}/>
			</main>
		</>
	)
}

export default Verification;