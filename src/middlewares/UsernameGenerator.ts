type TUsernameGeneratorProps = {
    name: string;
    id: string;
}

const UsernameGenerator = ({ name, id }: TUsernameGeneratorProps ) => {

    const threeDigits = id.toString().substring(0, 3);
    const tagname = name.trim().split(' ');
    const username = (tagname[0] + tagname[1]).toLowerCase() + '@' + threeDigits;
    return username;
}

export { UsernameGenerator };
