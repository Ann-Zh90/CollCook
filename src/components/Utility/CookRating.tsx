import React, {FC, Fragment} from "react";
import { styled } from '@mui/material/styles';
import Rating from '@mui/material/Rating';
import SoupKitchenRoundedIcon from '@mui/icons-material/SoupKitchenRounded';



const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
        color: '#ffcc6d',
    },
    '& .MuiRating-iconHover': {
        color: '#ffe763',
    },
});

interface ICookRatingProps {
    value: number;
}

const CookRating: FC<ICookRatingProps> = ({value}) => {


    return <Fragment>
        <StyledRating
            name="customized-color"
            readOnly={true}
            value={value}
            getLabelText={(value: number) => `${value} Heart${value !== 1 ? 's' : ''}`}
            precision={0.5}
            icon={<SoupKitchenRoundedIcon fontSize="small" />}
            emptyIcon={<SoupKitchenRoundedIcon fontSize="small" />}
        />
    </Fragment>
}

export default CookRating;
