import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Debug "mo:base/Debug";
import Iter "mo:base/Iter";

actor Token {
    // Define owner, total supply, and symbol
    let owner: Principal = Principal.fromText("rxdiq-qelei-bnglx-pneu2-imbpv-3t4v6-5y6uj-ltorg-lfkym-46qdo-7qe");
    let totalSupply: Nat = 100000000000;
    let symbol: Text = "Nisvy";
    
    private stable var balanceEntries : [(Principal, Nat)] = [];
    // Initialize a HashMap for balances with Principal keys and Nat values
   private var balances = HashMap.HashMap<Principal, Nat>(1, Principal.equal, Principal.hash);
    public func init() {
        if (balances.size() < 1) {
            balances.put(owner, totalSupply);
        }
    };

    // Constructor-like function to initialize balances
    // Needs to be done in an init block or function, not directly in the actor body
    
   
    

    // Query function to check balance
    public query func balanceOf(who: Principal): async Nat {
        let balance : Nat = switch (balances.get(who)) {
            case null   0 ;
            case (?result)   result ;
        };

        return balance;
    };

    public query func getSymbol(): async Text{
       Debug.print(debug_show(symbol));
       return symbol;

    };
    public shared(msg) func payOut() : async Text {
        Debug.print(debug_show(msg.caller));
        if(balances.get(msg.caller)==null)
        {
        let amount = 10000;
        let result = await transfer(msg.caller, amount);
        return result;
        }
        else{
            return "Already Claimed"
        }
    };

    public shared(msg) func transfer(to: Principal , amount: Nat) : async Text{
            let fromBalance = await balanceOf(msg.caller);

            if(fromBalance > amount){

                let newFromBalance : Nat = fromBalance - amount;
                balances.put(msg.caller, newFromBalance);

                let toBalance = await balanceOf(to);
                let newToBalance = toBalance + amount;
                balances.put(to, newToBalance);
                return "success";
            }
            else{
                return "Insufficient funds"
            }
    };

    system func preupgrade(){
        balanceEntries:=Iter.toArray(balances.entries());
    };

    system func postupgrade(){
        balances := HashMap.fromIter<Principal, Nat>(balanceEntries.vals(),1,Principal.equal,Principal.hash);
        if(balances.size() < 1)
        {
             balances.put(owner,totalSupply);
        }
    };


}

