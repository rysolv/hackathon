import { Text } from '@nextui-org/react';

const Numbers = ({id}: {id: string}) => {
	return (
		<div id={`phoneNumber-${id}`} className='phoneNumbers'>
			<Text>0</Text>
			<Text>1</Text>
			<Text>2</Text>
			<Text>3</Text>
			<Text>4</Text>
			<Text>5</Text>
			<Text>6</Text>
			<Text>7</Text>
			<Text>8</Text>
			<Text>9</Text>
			<Text>0</Text>
			<Text>1</Text>
			<Text>2</Text>
			<Text>3</Text>
			<Text>4</Text>
			<Text>5</Text>
			<Text>6</Text>
			<Text>7</Text>
			<Text>8</Text>
			<Text>9</Text>
		</div>
	)
}

export default Numbers;