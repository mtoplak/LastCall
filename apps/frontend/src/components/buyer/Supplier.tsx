import { Typography } from '@mui/material';
import HouseBox from 'components/ui/HouseBox';
import InfoBox from 'components/ui/InfoBox';
import { ISeller } from 'models/seller';
import React from 'react';

interface SupplierProps {
	seller: ISeller;
}

const Supplier: React.FC<SupplierProps> = ({ seller }) => {
	return (
		<HouseBox>
			<InfoBox>
				<Typography variant="h6" sx={{ fontWeight: '700' }}>
					{seller.title}
				</Typography>
				<Typography variant="body1" sx={{ my: 1 }}>
					Location: {seller.city + ', ' + seller.country}
				</Typography>
				{seller.companyType}
			</InfoBox>
		</HouseBox>
	);
};

export default Supplier;
