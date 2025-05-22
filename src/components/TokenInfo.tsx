
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const TokenInfo = () => {
  return (
    <div className="space-y-6">
      <div className="text-center p-8 bg-gradient-to-r from-green-700 to-green-500 rounded-lg text-white">
        <h1 className="text-4xl font-bold mb-2">$GREEN Token</h1>
        <p className="text-xl opacity-90">The Solana-based token that rewards real-world eco-actions</p>
      </div>
      
      <Tabs defaultValue="about" className="w-full">
        <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto">
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="tokenomics">Tokenomics</TabsTrigger>
          <TabsTrigger value="code">Smart Contract</TabsTrigger>
        </TabsList>
        
        <TabsContent value="about" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>About $GREEN Token</CardTitle>
              <CardDescription>Understanding the eco-friendly cryptocurrency</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                $GREEN is an SPL token on the Solana blockchain designed to incentivize and reward real-world
                environmental actions. Each token represents a verified contribution to making our planet greener.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                  <h3 className="font-semibold text-green-800 mb-2">Use Cases</h3>
                  <ul className="list-disc list-inside space-y-1 text-green-700">
                    <li>Purchase AI eco-agents in the marketplace</li>
                    <li>Trade for other cryptocurrencies</li>
                    <li>Redeem for eco-friendly products and services</li>
                    <li>Stake to earn passive rewards</li>
                    <li>Participate in DAO governance decisions</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                  <h3 className="font-semibold text-green-800 mb-2">How to Earn</h3>
                  <ul className="list-disc list-inside space-y-1 text-green-700">
                    <li>Complete verified recycling tasks</li>
                    <li>Participate in community clean-ups</li>
                    <li>Plant trees and document the activity</li>
                    <li>Engage in other verified eco-actions</li>
                    <li>Create and sell your own eco-agents</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="tokenomics" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>$GREEN Tokenomics</CardTitle>
              <CardDescription>Economic model and distribution</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-green-800 mb-3">Token Distribution</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-green-700">User Rewards:</span>
                      <span className="font-semibold">50%</span>
                    </div>
                    <div className="h-3 bg-green-100 rounded-full overflow-hidden">
                      <div className="bg-green-500 h-full" style={{ width: "50%" }}></div>
                    </div>
                    
                    <div className="flex justify-between mt-2">
                      <span className="text-green-700">Ecosystem Growth:</span>
                      <span className="font-semibold">20%</span>
                    </div>
                    <div className="h-3 bg-green-100 rounded-full overflow-hidden">
                      <div className="bg-green-600 h-full" style={{ width: "20%" }}></div>
                    </div>
                    
                    <div className="flex justify-between mt-2">
                      <span className="text-green-700">Team & Development:</span>
                      <span className="font-semibold">15%</span>
                    </div>
                    <div className="h-3 bg-green-100 rounded-full overflow-hidden">
                      <div className="bg-green-700 h-full" style={{ width: "15%" }}></div>
                    </div>
                    
                    <div className="flex justify-between mt-2">
                      <span className="text-green-700">Strategic Partnerships:</span>
                      <span className="font-semibold">10%</span>
                    </div>
                    <div className="h-3 bg-green-100 rounded-full overflow-hidden">
                      <div className="bg-green-800 h-full" style={{ width: "10%" }}></div>
                    </div>
                    
                    <div className="flex justify-between mt-2">
                      <span className="text-green-700">Community Fund:</span>
                      <span className="font-semibold">5%</span>
                    </div>
                    <div className="h-3 bg-green-100 rounded-full overflow-hidden">
                      <div className="bg-green-900 h-full" style={{ width: "5%" }}></div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-green-800 mb-2">Token Details</h3>
                    <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                      <div className="grid grid-cols-2 gap-y-2">
                        <div className="text-green-700">Max Supply:</div>
                        <div className="font-semibold text-right">1,000,000,000</div>
                        
                        <div className="text-green-700">Initial Circulating Supply:</div>
                        <div className="font-semibold text-right">250,000,000</div>
                        
                        <div className="text-green-700">Blockchain:</div>
                        <div className="font-semibold text-right">Solana</div>
                        
                        <div className="text-green-700">Token Type:</div>
                        <div className="font-semibold text-right">SPL</div>
                        
                        <div className="text-green-700">Emission Rate:</div>
                        <div className="font-semibold text-right">Deflationary</div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-green-800 mb-2">Task Rewards</h3>
                    <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                      <div className="grid grid-cols-2 gap-y-2">
                        <div className="text-green-700">Recycling:</div>
                        <div className="font-semibold text-right">5-15 $GREEN</div>
                        
                        <div className="text-green-700">Beach/Park Cleanup:</div>
                        <div className="font-semibold text-right">10-30 $GREEN</div>
                        
                        <div className="text-green-700">Tree Planting:</div>
                        <div className="font-semibold text-right">20-50 $GREEN</div>
                        
                        <div className="text-green-700">Composting:</div>
                        <div className="font-semibold text-right">5-20 $GREEN</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="code" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Smart Contract Structure</CardTitle>
              <CardDescription>Solana Anchor program for GreenTask</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-zinc-900 text-green-300 p-4 rounded-lg overflow-x-auto text-sm">
                <pre className="font-mono">
{`use anchor_lang::prelude::*;
use anchor_spl::token::{self, Mint, Token, TokenAccount};

declare_id!("GRN1HLt4mEjSwxn5RuMBs1Xw9K4kZ5UYj9KSgApYrTHu");

#[program]
pub mod green_task {
    use super::*;

    pub fn initialize_token(ctx: Context<InitializeToken>) -> Result<()> {
        Ok(())
    }

    pub fn create_task(
        ctx: Context<CreateTask>, 
        task_type: String,
        description: String,
        ipfs_hash: String,
        lat: f64,
        lng: f64,
    ) -> Result<()> {
        let task = &mut ctx.accounts.task;
        task.owner = ctx.accounts.user.key();
        task.task_type = task_type;
        task.description = description;
        task.ipfs_hash = ipfs_hash;
        task.latitude = lat;
        task.longitude = lng;
        task.verified = false;
        task.timestamp = Clock::get()?.unix_timestamp;
        Ok(())
    }

    pub fn verify_task(
        ctx: Context<VerifyTask>,
        verified: bool,
        reward_amount: u64,
    ) -> Result<()> {
        let task = &mut ctx.accounts.task;
        if !ctx.accounts.verifier.is_signer {
            return Err(ErrorCode::UnauthorizedVerifier.into());
        }
        
        task.verified = verified;
        
        if verified {
            // Transfer tokens as reward
            let cpi_accounts = token::Transfer {
                from: ctx.accounts.reward_vault.to_account_info(),
                to: ctx.accounts.user_token.to_account_info(),
                authority: ctx.accounts.token_authority.to_account_info(),
            };
            
            let cpi_program = ctx.accounts.token_program.to_account_info();
            let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);
            
            token::transfer(cpi_ctx, reward_amount)?;
        }
        
        Ok(())
    }
}

#[derive(Accounts)]
pub struct InitializeToken<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,
    
    #[account(
        init,
        payer = authority,
        mint::decimals = 9,
        mint::authority = authority,
    )]
    pub mint: Account<'info, Mint>,
    
    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, Token>,
    pub rent: Sysvar<'info, Rent>,
}

#[derive(Accounts)]
pub struct CreateTask<'info> {
    #[account(mut)]
    pub user: Signer<'info>,
    
    #[account(
        init,
        payer = user,
        space = 8 + 32 + 50 + 200 + 50 + 8 + 8 + 1 + 8,
    )]
    pub task: Account<'info, Task>,
    
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct VerifyTask<'info> {
    #[account(mut)]
    pub verifier: Signer<'info>,
    
    #[account(mut)]
    pub task: Account<'info, Task>,
    
    #[account(mut)]
    pub user_token: Account<'info, TokenAccount>,
    
    #[account(mut)]
    pub reward_vault: Account<'info, TokenAccount>,
    
    pub token_authority: AccountInfo<'info>,
    pub token_program: Program<'info, Token>,
}

#[account]
pub struct Task {
    pub owner: Pubkey,
    pub task_type: String,
    pub description: String,
    pub ipfs_hash: String,
    pub latitude: f64,
    pub longitude: f64,
    pub verified: bool,
    pub timestamp: i64,
}

#[error_code]
pub enum ErrorCode {
    #[msg("Unauthorized verifier")]
    UnauthorizedVerifier,
}`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TokenInfo;
