import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import getStripe from '@/utils/get-stripe';
import { useSelector } from 'react-redux';

const PricingSection = () => {

    const user = useSelector((state) => state.user.user);
    const handleSubmit = async (event) => {

        // if (!user) {
        //     // User is not logged in
        //     alert('You need to be logged in to upgrade to Pro.');
        //     return;
        //   }
      const checkoutSession = await fetch('/api/checkout_session', {
        method: 'POST',
        headers: {
          origin: 'http://localhost:3000',
        },
      });

      const checkoutSessionJson = await checkoutSession.json();

      if(checkoutSession.statusCode === 500){
        console.error(checkoutSession.message)
        return
      }

      const stripe = await getStripe()
      const {error} = await stripe.redirectToCheckout({
        sessionId: checkoutSessionJson.id,
      });

      if(error){
        console.warn(error.message)
      }
    };
  return (
    <div className="mt-10 text-center">
      <Typography variant="h4" className="mb-5">
        Choose Your Plan
      </Typography>
      <div className="flex justify-center gap-6">
        {/* Basic Plan */}
        <Card className="w-80">
          <CardContent>
            <Typography variant="h5" component="div">
              Basic
            </Typography>
            <Typography variant="h6" className="my-4">
              Free
            </Typography>
            <ul className="list-none p-0 text-left mb-4">
              <li className="mb-2">Flashcard Example</li>
              <li className="mb-2">Limited AI Integration</li>
            </ul>
            <Button variant="contained" color="primary" className="mt-4" href="/sign-in">
              Get Started
            </Button>
          </CardContent>
        </Card>

        {/* Pro Plan */}
        <Card className="w-80 bg-gray-100">
          <CardContent>
            <Typography variant="h5" component="div">
              Pro
            </Typography>
            <Typography variant="h6" className="my-4">
              $1.00/month
            </Typography>
            <ul className="list-none p-0 text-left mb-4">
              <li className="mb-2">Flashcard Example</li>
              <li className="mb-2">Unlimited AI Integration</li>
              <li className="mb-2">Priority Support</li>
            </ul>
            <Button variant="contained" color="secondary" className="mt-4" onClick={handleSubmit}>
              Upgrade to Pro
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PricingSection;
