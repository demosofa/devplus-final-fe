import { CampaignCountdown } from '@components';
import { CAMPAIGN } from '@enums';

export const CampaignTest = () => {
	return (
		<div style={{ color: 'red' }}>
			<CampaignCountdown
				campaign={{
					id: 1,
					status: CAMPAIGN.ACTIVE,
					expired_time: '2023-08-25T21:00',
				}}
				queryKey={['campaign']}
				onFinish={() => {
					console.log('expired');
				}}
			/>
		</div>
	);
};
