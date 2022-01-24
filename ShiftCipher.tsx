import {
  Box,
  Heading,
  useBreakpointValue,
  useColorMode,
  Input,
  Text,
  Button,
  Stack,
  IconButton,
  Select,
} from "@chakra-ui/react";
import { UpDownIcon } from '@chakra-ui/icons';
import { isEmpty, toNumber } from "lodash";
const ShiftCipher = () => {
  const { colorMode } = useColorMode();
  const textSize = useBreakpointValue({
    base: "xs",
    sm: "md",
  });

  return (
    <>
      <Heading paddingTop={16} paddingBottom={16} as="h2" fontSize={{base: "2xl",md:"6xl"}}>
        Substitution Shift Cipher
      </Heading>
      <Stack paddingBottom={4} direction={'row'} spacing={4}>
        <Box minWidth={{base: "45",md:"75%"}}>
          <Text id="inputTxt" mb='8px'>Plaintext:</Text>
          <Input id='input' placeholder='Input' size='md' />
        </Box>
        <Box minWidth="25%">
        <Text id="inputTxt" mb='8px'>Shift</Text>
          <Select id="shiftVal" placeholder='Select'>
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3 - Caesar Cipher</option>
            <option value='4'>4</option>
            <option value='5'>5</option>
            <option value='6'>6</option>
            <option value='7'>7</option>
            <option value='8'>8</option>
            <option value='9'>9</option>
            <option value='10'>10</option>
            <option value='11'>11</option>
            <option value='12'>12</option>
            <option value='13'>13 - ROT 13</option>
            <option value='14'>14</option>
            <option value='15'>15</option>
            <option value='16'>16</option>
            <option value='17'>17</option>
            <option value='18'>18</option>
            <option value='19'>19</option>
            <option value='20'>20</option>
            <option value='21'>21</option>
            <option value='22'>22</option>
            <option value='23'>23</option>
            <option value='24'>24</option>
            <option value='25'>25</option>
          </Select>
        </Box>
      </Stack>
      <Stack paddingBottom={4} direction={'row'} spacing={4}>
      <Button id="inputBtn" colorScheme='orange' onClick={cipher}>Encrypt</Button>
      <IconButton onClick={switchCipher} aria-label='Reverse' icon={<UpDownIcon />} />
      </Stack>

      <Text id="outputTxt" mb='8px'>Ciphertext:</Text>
      <Box
        backgroundColor={colorMode === "light" ? "gray.200" : "gray.500"}
        padding={4}
        borderRadius={4}
        marginBottom={4}
      >
        <Box fontSize={textSize}>
          <Text id="Output">Output</Text>
        </Box>
      </Box>
    </>
  );
};

var switcher : Boolean = false
var virgin : Boolean = true

function isLetter(str : any) {
  return str.length === 1 && str.match(/[a-z]/i);
}

function switchCipher() {
  if (!switcher) {
    document.getElementById("outputTxt")!.textContent = "Plaintext:"
    document.getElementById("inputTxt")!.textContent = "Ciphertext:"
    document.getElementById("inputBtn")!.textContent = "Decrypt"
    let save = document.getElementById("Output")!.textContent
    if ((!virgin)){
      document.getElementById("Output")!.textContent = (document.getElementById("input") as HTMLInputElement).value;
      if (save !== null) {
        (document.getElementById("input") as HTMLInputElement).value = save
      }
    }
  }else{
    document.getElementById("outputTxt")!.textContent = "Ciphertext:"
    document.getElementById("inputTxt")!.textContent = "Plaintext:"
    document.getElementById("inputBtn")!.textContent = "Encrypt"
    let save = document.getElementById("Output")!.textContent
    if (!virgin){
      document.getElementById("Output")!.textContent = (document.getElementById("input") as HTMLInputElement).value;
      if (save !== null) {
        (document.getElementById("input") as HTMLInputElement).value = save
      }
    }
  }
  virgin = false
  switcher = !switcher
}

function cipher() {
  let input = (document.getElementById("input") as HTMLInputElement).value
  let shift = toNumber((document.getElementById("shiftVal") as HTMLInputElement).value)
  let alphabetlow: Array<string> = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
  let alphabetup: Array<string> =  ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
  let inputArray: Array<string> = input.split("")

  if (!switcher) {
    let encryptedString: string = ""
    inputArray.forEach((x) => {
      if (!isLetter(x)) {
        encryptedString += x
      }else if (x == x.toLowerCase()) {
        if (alphabetlow.indexOf(x) + shift > 25){
          encryptedString += alphabetlow[alphabetlow.indexOf(x) + shift - 26]
        }else{
          encryptedString += alphabetlow[alphabetlow.indexOf(x) + shift]
        }
      }else{
        if (alphabetup.indexOf(x) + shift > 25){
          encryptedString += alphabetup[(alphabetup.indexOf(x) + shift - 26)]
        }else{
          encryptedString += alphabetup[alphabetup.indexOf(x) + shift]
        }
      }
    });
    document.getElementById("Output")!.textContent = encryptedString
  }else if (switcher) {
    let decryptedString: string = ""
    inputArray.forEach((x) => {
      if (!isLetter(x)){
        decryptedString += x
      }else if (x == x.toLowerCase()){
        if (alphabetlow.indexOf(x) - shift < 0) {
          decryptedString += alphabetlow[alphabetlow.indexOf(x) - shift + 26]
        }else{
          decryptedString += alphabetlow[alphabetlow.indexOf(x) - shift]
        }
      }else{
        if (alphabetup.indexOf(x) - shift < 0) {
          decryptedString += alphabetup[alphabetup.indexOf(x) - shift + 26]
        }else{
          decryptedString += alphabetup[alphabetup.indexOf(x) - shift]
        }
      }
    });
    document.getElementById("Output")!.textContent = decryptedString
  }
}

export default ShiftCipher;
