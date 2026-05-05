/* eslint-disable */
import React, { useState, useEffect } from 'react';

const BACKEND_URL = "https://thepickzone-backend-1.onrender.com";
const PAYPAL_CLIENT_ID = "AfC5IdhZr9ZgD94g2Rszgj8rwgM8o1R9j2bdsn-rOfvshjKp-jEqPiMKt057mJdfdSK8czay2muw3MB0";

// ── GLOBAL STYLES ─────────────────────────────────────────────────────────────
const G = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@400;600;700;900&family=DM+Sans:wght@400;500;600&display=swap');
  :root {
    --g: #1DB954; --gold: #F5C542; --dark: #0B0F0E; --d2: #0f1410; --d3: #111815;
    --d4: #161d1a; --border: #1e2d24; --text: #e8f0ec; --text-dim: #92a89f; --muted: #6B8078;
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: var(--dark); color: var(--text); font-family: 'DM Sans', sans-serif; }
  @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:none; } }
  @keyframes popIn { from { opacity:0; transform:scale(0.95); } to { opacity:1; transform:scale(1); } }
  @keyframes spin { to { transform: rotate(360deg); } }
  @keyframes pulse { 0%,100%{opacity:1}50%{opacity:0.5} }
  @keyframes ticker { from{transform:translateX(0)}to{transform:translateX(-50%)} }
`;

// ── HELPERS ───────────────────────────────────────────────────────────────────
function isMatchStarted(timeStr) {
  if (!timeStr) return false;
  try {
    if (timeStr.includes('T') || timeStr.includes('Z')) {
      return new Date(timeStr) <= new Date();
    }
    const days = {'Dom':0,'Lun':1,'Mar':2,'Mie':3,'Jue':4,'Vie':5,'Sab':6};
    const months = {'Ene':0,'Feb':1,'Mar':2,'Abr':3,'May':4,'Jun':5,'Jul':6,'Ago':7,'Sep':8,'Oct':9,'Nov':10,'Dic':11};
    const parts = timeStr.match(/(\w+)\s+(\d+)\s+(\w+)\s*-\s*(\d+):(\d+)/);
    if (!parts) return false;
    const now = new Date();
    const d = new Date(now.getFullYear(), months[parts[3]], parseInt(parts[2]), parseInt(parts[4]), parseInt(parts[5]));
    return d <= now;
  } catch(e) { return false; }
}

function isoToLocal(iso) {
  try {
    const d = new Date(iso);
    const days = ["Dom","Lun","Mar","Mie","Jue","Vie","Sab"];
    const months = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];
    return `${days[d.getDay()]} ${d.getDate()} ${months[d.getMonth()]} - ${String(d.getHours()).padStart(2,"0")}:${String(d.getMinutes()).padStart(2,"0")}`;
  } catch(e) { return iso; }
}

// ── LEAGUES ───────────────────────────────────────────────────────────────────
const ALL_LEAGUES = [
  {id:1,  name:"Liga MX",              flag:"🇲🇽", sport:"⚽", country:"México"},
  {id:2,  name:"Premier League",       flag:"🏴󠁧󠁢󠁥󠁮󠁧󠁿", sport:"⚽", country:"Inglaterra"},
  {id:3,  name:"La Liga",              flag:"🇪🇸", sport:"⚽", country:"España"},
  {id:4,  name:"Bundesliga",           flag:"🇩🇪", sport:"⚽", country:"Alemania"},
  {id:5,  name:"Serie A",              flag:"🇮🇹", sport:"⚽", country:"Italia"},
  {id:6,  name:"Ligue 1",              flag:"🇫🇷", sport:"⚽", country:"Francia"},
  {id:7,  name:"Champions League",     flag:"🌍", sport:"⚽", country:"Europa"},
  {id:8,  name:"Europa League",        flag:"🌍", sport:"⚽", country:"Europa"},
  {id:9,  name:"Copa Libertadores",    flag:"🌎", sport:"⚽", country:"Sudamérica"},
  {id:10, name:"Copa Sudamericana",    flag:"🌎", sport:"⚽", country:"Sudamérica"},
  {id:11, name:"MLS",                  flag:"🇺🇸", sport:"⚽", country:"EE.UU."},
  {id:12, name:"NBA",                  flag:"🇺🇸", sport:"🏀", country:"EE.UU."},
  {id:13, name:"NFL",                  flag:"🇺🇸", sport:"🏈", country:"EE.UU."},
  {id:14, name:"MLB",                  flag:"🇺🇸", sport:"⚾", country:"EE.UU."},
  {id:15, name:"NHL",                  flag:"🇺🇸", sport:"🏒", country:"EE.UU."},
  {id:16, name:"Liga Argentina",       flag:"🇦🇷", sport:"⚽", country:"Argentina"},
  {id:17, name:"Brasileirão Serie A",  flag:"🇧🇷", sport:"⚽", country:"Brasil"},
  {id:18, name:"Liga Chile",           flag:"🇨🇱", sport:"⚽", country:"Chile"},
  {id:19, name:"Saudi Pro League",     flag:"🇸🇦", sport:"⚽", country:"Arabia Saudita"},
  {id:20, name:"Eredivisie",           flag:"🇳🇱", sport:"⚽", country:"Holanda"},
  {id:21, name:"Scottish Premiership", flag:"🏴󠁧󠁢󠁳󠁣󠁴󠁿", sport:"⚽", country:"Escocia"},
  {id:22, name:"Allsvenskan",          flag:"🇸🇪", sport:"⚽", country:"Suecia"},
  {id:23, name:"Eliteserien",          flag:"🇳🇴", sport:"⚽", country:"Noruega"},
  {id:24, name:"Ekstraklasa",          flag:"🇵🇱", sport:"⚽", country:"Polonia"},
  {id:25, name:"J1 League",            flag:"🇯🇵", sport:"⚽", country:"Japón"},
  {id:26, name:"K League 1",           flag:"🇰🇷", sport:"⚽", country:"Corea"},
  {id:27, name:"FA Cup",               flag:"🏴󠁧󠁢󠁥󠁮󠁧󠁿", sport:"⚽", country:"Inglaterra"},
  {id:28, name:"FIFA World Cup",       flag:"🌍", sport:"⚽", country:"Mundial"},
  {id:29, name:"Copa América",         flag:"🌎", sport:"⚽", country:"Sudamérica"},
  {id:30, name:"WNBA",                 flag:"🇺🇸", sport:"🏀", country:"EE.UU."},
];

// ── NAVBAR ────────────────────────────────────────────────────────────────────
function NavBar({ view, setView, user, setUser, notifications, setNotifications }) {
  return (
    <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:200,background:"rgba(11,15,14,0.97)",backdropFilter:"blur(16px)",borderBottom:"1px solid var(--border)",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 5%"}}>
      <button onClick={()=>setView("home")} style={{background:"none",border:"none",cursor:"pointer",color:"var(--g)",fontFamily:"'Bebas Neue'",fontSize:"1.4rem",letterSpacing:2}}>
        THE PICK ZONE
      </button>
      <div style={{display:"flex",gap:6,alignItems:"center",flexWrap:"nowrap"}}>
        {[["home","Inicio"],["marketplace","Picks"],["rankings","Rankings"]].map(([v,l])=>(
          <button key={v} onClick={()=>setView(v)} style={{background:view===v?"rgba(29,185,84,0.15)":"none",border:view===v?"1px solid var(--g)":"1px solid transparent",color:view===v?"var(--g)":"rgba(255,255,255,0.85)",padding:"8px 12px",borderRadius:6,cursor:"pointer",fontSize:"0.75rem",fontWeight:700,letterSpacing:1,textTransform:"uppercase",minHeight:44}}>
            {l}
          </button>
        ))}
        {!user && (
          <button onClick={()=>setView("login")} style={{background:"var(--g)",color:"#000",border:"none",padding:"8px 16px",borderRadius:6,cursor:"pointer",fontSize:"0.75rem",fontWeight:900,letterSpacing:1,textTransform:"uppercase",minHeight:44,marginLeft:4}}>
            Ingresar
          </button>
        )}
        {user && (
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <button onClick={()=>setView("profile")} style={{background:"var(--d3)",color:"var(--text)",border:"1px solid var(--border)",padding:"7px 12px",borderRadius:6,cursor:"pointer",fontSize:"0.75rem",fontWeight:700}}>
              Mi Perfil
            </button>
            {(user.role === 'pro' || user.role === 'admin') && (
              <>
                {user.role==="admin" && (
                  <button onClick={()=>setView("pro-panel")} style={{background:"var(--d3)",color:"var(--g)",border:"1px solid var(--g)",padding:"7px 14px",borderRadius:6,cursor:"pointer",fontSize:"0.75rem",fontWeight:900,letterSpacing:1,textTransform:"uppercase"}}>
                    Panel Pro
                  </button>
                )}
                <button onClick={()=>setView(user.role==="admin"?"admin-panel":"pro-panel")} style={{background:"var(--g)",color:"#000",border:"none",padding:"7px 14px",borderRadius:6,cursor:"pointer",fontSize:"0.75rem",fontWeight:900,letterSpacing:1,textTransform:"uppercase"}}>
                  {user.role==="admin"?"Admin":"Panel Pro"}
                </button>
              </>
            )}
            <button onClick={()=>{setUser(null);localStorage.removeItem("tpz_token");setView("home");}} style={{background:"var(--d3)",color:"var(--muted)",border:"1px solid var(--border)",padding:"7px 10px",borderRadius:6,cursor:"pointer",fontSize:"0.72rem"}}>
              Salir
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

// ── HOME ──────────────────────────────────────────────────────────────────────
function HomeView({ setView, setPurchaseTarget, picks }) {
  const resolved = picks.filter(p=>p.result==="won"||p.result==="lost");
  const won = picks.filter(p=>p.result==="won").length;
  const winRate = resolved.length > 0 ? Math.round((won/resolved.length)*100) : 0;

  return (
    <div>
      <section style={{minHeight:"100vh",display:"flex",alignItems:"center",padding:"clamp(90px,15vw,120px) 5% 60px",position:"relative"}}>
        <div style={{position:"relative",zIndex:2,maxWidth:660,animation:"fadeUp .7s ease both"}}>
          <h1 style={{fontFamily:"'Bebas Neue'",fontSize:"clamp(3rem,7vw,5.5rem)",lineHeight:.9,letterSpacing:2,marginBottom:24}}>
            Picks deportivos<br/><span style={{color:"var(--g)"}}>de elite</span>
          </h1>
          <p style={{fontSize:"1.05rem",color:"var(--text-dim)",lineHeight:1.8,maxWidth:480,marginBottom:40}}>
            Compra picks verificados de los mejores tipsters. Momios reales, tickets de apuesta, resultados comprobados.
          </p>
          <button onClick={()=>setView("marketplace")} style={{background:"var(--g)",color:"#000",border:"none",padding:"15px 36px",borderRadius:6,fontFamily:"'Barlow Condensed'",fontSize:"1rem",fontWeight:900,letterSpacing:2,cursor:"pointer"}}>
            VER TODOS LOS PICKS
          </button>
          <div style={{display:"flex",gap:16,marginTop:48,flexWrap:"wrap"}}>
            {[[winRate+"%","Win Rate"],[picks.length+"+","Picks activos"],["3","Tipsters Pro"]].map(([v,l])=>(
              <div key={l} style={{background:"var(--d3)",border:"1px solid var(--border)",borderRadius:10,padding:"18px 22px",textAlign:"center",minWidth:110}}>
                <div style={{fontFamily:"'Bebas Neue'",fontSize:"2.4rem",color:"var(--g)",lineHeight:1}}>{v}</div>
                <div style={{fontSize:"0.7rem",color:"var(--text-dim)",letterSpacing:2,marginTop:4,fontWeight:600}}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {picks.length > 0 && (
        <section style={{padding:"60px 5%",background:"var(--d2)"}}>
          <h2 style={{fontFamily:"'Bebas Neue'",fontSize:"2rem",marginBottom:24}}>Picks <span style={{color:"var(--g)"}}>disponibles</span></h2>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:16}}>
            {picks.filter(p=>!isMatchStarted(p.time)).slice(0,4).map((p,i)=>(
              <PickCard key={p._id||i} pick={p} setView={setView} setPurchaseTarget={setPurchaseTarget}/>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

// ── PICK CARD ─────────────────────────────────────────────────────────────────
function PickCard({ pick, setView, setPurchaseTarget }) {
  const started = isMatchStarted(pick.time);
  const timeDisplay = pick.time && (pick.time.includes('T') || pick.time.includes('Z')) ? isoToLocal(pick.time) : pick.time;

  if (started) return null;

  return (
    <div style={{background:"var(--d3)",border:"1px solid var(--border)",borderRadius:10,overflow:"hidden",transition:"all .25s"}}
      onMouseEnter={e=>e.currentTarget.style.borderColor="rgba(29,185,84,0.5)"}
      onMouseLeave={e=>e.currentTarget.style.borderColor="var(--border)"}>
      <div style={{padding:"13px 18px",borderBottom:"1px solid var(--border)",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <span style={{background:"rgba(29,185,84,0.1)",border:"1px solid rgba(29,185,84,0.2)",color:"var(--g)",padding:"3px 10px",borderRadius:100,fontSize:"0.67rem",fontWeight:700}}>
          {pick.sport} {pick.league}
        </span>
        <span style={{color:"var(--gold)",fontWeight:700}}>{pick.odds}</span>
      </div>
      <div style={{padding:18}}>
        <div style={{fontSize:"0.72rem",color:"var(--text-dim)",marginBottom:5}}>{timeDisplay}</div>
        <div style={{fontFamily:"'Barlow Condensed'",fontSize:"1.2rem",fontWeight:700,marginBottom:12}}>{pick.match}</div>
        <div style={{background:"var(--d4)",borderRadius:8,padding:"10px",textAlign:"center",border:"1px dashed rgba(29,185,84,0.2)",marginBottom:14}}>
          <span style={{fontSize:"0.65rem",color:"var(--muted)",letterSpacing:1.5,textTransform:"uppercase"}}>🔒 Contenido exclusivo</span>
        </div>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div style={{fontSize:"0.82rem",fontWeight:700}}>{pick.tipster}</div>
          <button onClick={()=>{setPurchaseTarget(pick);setView("purchase");}} style={{background:pick.price===0||pick.price==="0"?"#17a347":"var(--g)",color:"#000",border:"none",padding:"10px 20px",borderRadius:6,fontFamily:"'Barlow Condensed'",fontSize:"0.88rem",fontWeight:900,letterSpacing:1.5,cursor:"pointer"}}>
            {pick.price===0||pick.price==="0"?"🎁 GRATIS":`$${pick.price} USD`}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── MARKETPLACE ───────────────────────────────────────────────────────────────
function MarketplaceView({ setView, setPurchaseTarget, picks }) {
  const available = picks.filter(p => !isMatchStarted(p.time));
  return (
    <div style={{paddingTop:80,minHeight:"100vh",padding:"clamp(80px,12vw,100px) 5% 60px"}}>
      <h1 style={{fontFamily:"'Bebas Neue'",fontSize:"clamp(2rem,5vw,3rem)",marginBottom:8}}>
        Marketplace <span style={{color:"var(--g)"}}>de Picks</span>
      </h1>
      <p style={{color:"var(--muted)",marginBottom:32}}>{available.length} picks disponibles ahora</p>
      {available.length === 0 ? (
        <div style={{textAlign:"center",padding:80,color:"var(--muted)"}}>
          <div style={{fontSize:"3rem",marginBottom:16}}>📭</div>
          <div>No hay picks disponibles en este momento</div>
        </div>
      ) : (
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:16}}>
          {available.map((p,i)=><PickCard key={p._id||i} pick={p} setView={setView} setPurchaseTarget={setPurchaseTarget}/>)}
        </div>
      )}
    </div>
  );
}

// ── PURCHASE VIEW ─────────────────────────────────────────────────────────────
function PurchaseView({ pick, setView, user }) {
  const [step, setStep] = useState(1);
  const [paying, setPaying] = useState(false);
  const [error, setError] = useState("");

  if (!pick) { setView("marketplace"); return null; }
  if (!user) return (
    <div style={{paddingTop:120,textAlign:"center",padding:"120px 5%"}}>
      <h2 style={{fontFamily:"'Bebas Neue'",fontSize:"2rem",marginBottom:16}}>Inicia sesión para comprar</h2>
      <button onClick={()=>setView("login")} style={{background:"var(--g)",color:"#000",border:"none",padding:"13px 28px",borderRadius:8,fontFamily:"'Barlow Condensed'",fontSize:"1rem",fontWeight:900,letterSpacing:2,cursor:"pointer"}}>INICIAR SESIÓN</button>
    </div>
  );

  const timeDisplay = pick.time && (pick.time.includes('T') || pick.time.includes('Z')) ? isoToLocal(pick.time) : pick.time;

  const [fullPick, setFullPick] = React.useState(pick);

  async function loadFullPick() {
    try {
      const token = localStorage.getItem("tpz_token");
      const r = await fetch(BACKEND_URL+"/api/picks/"+pick._id+"/full",{headers:{"Authorization":"Bearer "+token}});
      if(r.ok){ const data = await r.json(); setFullPick(data); }
    } catch(e){}
  }

  async function handleBuy() {
    if (pick.price === 0 || pick.price === "0") { await loadFullPick(); setStep(2); return; }
    setPaying(true); setError("");
    try {
      const token = localStorage.getItem("tpz_token");
      const r = await fetch(BACKEND_URL+"/api/paypal/create-order", {
        method:"POST", headers:{"Content-Type":"application/json","Authorization":"Bearer "+token},
        body: JSON.stringify({ amount: pick.price, description: "Pick: "+pick.match })
      });
      const data = await r.json();
      if (!r.ok) { setError(data.error||"Error"); setPaying(false); return; }
      const orderId = data.orderId;
      const paypalWin = window.open("https://www.paypal.com/checkoutnow?token="+orderId,"_blank","width=500,height=600");
      const interval = setInterval(async()=>{
        try {
          const cr = await fetch(BACKEND_URL+"/api/paypal/capture-order",{method:"POST",headers:{"Content-Type":"application/json","Authorization":"Bearer "+token},body:JSON.stringify({orderId})});
          if(cr.ok){clearInterval(interval);if(paypalWin)paypalWin.close();setStep(2);setPaying(false);}
        }catch(e){}
      },3000);
      setTimeout(()=>{clearInterval(interval);setPaying(false);},120000);
    } catch(e) { setError("Error de conexión"); setPaying(false); }
  }

  if (step === 2) return (
    <div style={{paddingTop:80,minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:"clamp(80px,12vw,100px) 5% 60px"}}>
      <div style={{maxWidth:440,width:"100%",animation:"popIn .4s ease",textAlign:"center"}}>
        <div style={{width:64,height:64,borderRadius:"50%",background:"rgba(29,185,84,0.15)",border:"2px solid var(--g)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 20px",fontSize:"1.8rem"}}>✅</div>
        <h2 style={{fontFamily:"'Bebas Neue'",fontSize:"2rem",color:"var(--g)",marginBottom:8}}>¡Pick Desbloqueado!</h2>
        <p style={{color:"var(--muted)",marginBottom:24}}>{pick.match}</p>
        <div style={{background:"var(--d3)",border:"1px solid var(--border)",borderRadius:12,padding:20,marginBottom:20,textAlign:"left"}}>
          <div style={{fontSize:"0.7rem",color:"var(--g)",letterSpacing:2,fontWeight:700,marginBottom:12}}>🔓 CONTENIDO DESBLOQUEADO</div>
          {fullPick.ticketImg ? (
            <img src={fullPick.ticketImg} alt="Ticket" style={{width:"100%",borderRadius:8}}/>
          ) : (
            <div style={{textAlign:"center",color:"var(--muted)",padding:20}}>Ticket no disponible</div>
          )}
        </div>
        <button onClick={()=>setView("marketplace")} style={{background:"var(--g)",color:"#000",border:"none",padding:"13px 28px",borderRadius:8,fontFamily:"'Barlow Condensed'",fontSize:"1rem",fontWeight:900,letterSpacing:2,cursor:"pointer"}}>
          VER MÁS PICKS
        </button>
      </div>
    </div>
  );

  return (
    <div style={{paddingTop:80,minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:"clamp(80px,12vw,100px) 5% 60px"}}>
      <div style={{maxWidth:440,width:"100%",animation:"popIn .4s ease"}}>
        <div style={{background:"var(--d2)",border:"1px solid rgba(29,185,84,0.3)",borderRadius:20,overflow:"hidden"}}>
          <div style={{padding:"20px 24px",textAlign:"center",borderBottom:"1px solid var(--border)"}}>
            <div style={{fontSize:"0.68rem",color:"var(--g)",letterSpacing:3,textTransform:"uppercase",fontWeight:700,marginBottom:8}}>🔥 PICK EXCLUSIVO 🔒</div>
            <div style={{fontFamily:"'Bebas Neue'",fontSize:"1.4rem"}}>{pick.match}</div>
            <div style={{fontSize:"0.75rem",color:"var(--muted)",marginTop:4}}>{timeDisplay} · {pick.league}</div>
          </div>
          <div style={{display:"flex",borderBottom:"1px solid var(--border)"}}>
            {[["$"+pick.price+" USD","Precio","var(--gold)"],[""+pick.odds,"Momio","var(--g)"],[pick.bank+"%","Bank","var(--text)"]].map(([v,l,c],i)=>(
              <div key={l} style={{flex:1,padding:"14px 8px",textAlign:"center",borderRight:i<2?"1px solid var(--border)":"none"}}>
                <div style={{fontFamily:"'Bebas Neue'",fontSize:"1.4rem",color:c}}>{v}</div>
                <div style={{fontSize:"0.65rem",color:"var(--muted)",letterSpacing:1}}>{l}</div>
              </div>
            ))}
          </div>
          <div style={{padding:"20px 24px",borderBottom:"1px solid var(--border)"}}>
            <div style={{background:"var(--d4)",borderRadius:8,padding:"20px",textAlign:"center",border:"1px dashed rgba(29,185,84,0.2)"}}>
              <span style={{fontSize:"1.5rem"}}>🔒</span>
              <div style={{fontSize:"0.65rem",color:"var(--muted)",letterSpacing:1.5,marginTop:6}}>CONTENIDO EXCLUSIVO</div>
              <div style={{fontSize:"0.62rem",color:"rgba(107,128,120,0.6)",marginTop:4}}>Disponible tras la compra</div>
            </div>
          </div>
          <div style={{padding:"14px 24px",display:"flex",alignItems:"center",gap:12,borderBottom:"1px solid var(--border)"}}>
            <div style={{width:36,height:36,borderRadius:"50%",background:"var(--g)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Bebas Neue'",color:"#000",fontSize:"1rem"}}>{(pick.tipster||"T")[0]}</div>
            <div>
              <div style={{fontWeight:700,fontSize:"0.9rem"}}>{pick.tipster}</div>
              <div style={{fontSize:"0.72rem",color:"var(--g)"}}>ROI {pick.roi||"+0%"}</div>
            </div>
          </div>
          <div style={{padding:20}}>
            {error && <div style={{background:"rgba(244,67,54,0.1)",border:"1px solid #f44336",color:"#f44336",padding:"8px 12px",borderRadius:6,marginBottom:12,fontSize:"0.8rem"}}>{error}</div>}
            <button onClick={handleBuy} disabled={paying} style={{width:"100%",background:paying?"var(--d4)":"var(--g)",color:paying?"var(--muted)":"#000",border:"none",padding:15,borderRadius:8,fontFamily:"'Barlow Condensed'",fontSize:"1.1rem",fontWeight:900,letterSpacing:2,cursor:"pointer"}}>
              {paying?"Procesando...":pick.price===0||pick.price==="0"?"OBTENER GRATIS":"COMPRAR - $"+pick.price+" USD"}
            </button>
            <div style={{textAlign:"center",fontSize:"0.72rem",color:"var(--muted)",marginTop:10}}>🔒 Pago seguro · Acceso inmediato</div>
          </div>
        </div>
        <button onClick={()=>setView("marketplace")} style={{background:"none",border:"none",color:"var(--muted)",fontSize:"0.8rem",cursor:"pointer",marginTop:16,display:"block",textAlign:"center",width:"100%"}}>← Volver al marketplace</button>
      </div>
    </div>
  );
}

// ── RANKINGS ──────────────────────────────────────────────────────────────────
function RankingsView({ setView, picks }) {
  const [tipsters, setTipsters] = useState([]);
  const [sortBy, setSortBy] = useState("roi");

  useEffect(()=>{
    fetch(BACKEND_URL+"/api/tipsters")
      .then(r=>r.json())
      .then(data=>{
        if(Array.isArray(data)){
          const t = data.map(u=>{
            const uPicks = picks.filter(p=>p.tipster===u.name);
            const won = uPicks.filter(p=>p.result==="won").length;
            const lost = uPicks.filter(p=>p.result==="lost").length;
            const winRate = won+lost>0 ? Math.round((won/(won+lost))*100) : (u.winRate||0);
            const roiNum = parseFloat((u.roi||"0").replace("+","").replace("%",""))||0;
            return {...u, picks:uPicks.length||u.totalPicks||0, won, lost, winRate, roiNum};
          });
          setTipsters(t);
        }
      }).catch(()=>{});
  },[picks]);

  const sorted = [...tipsters].sort((a,b)=>{
    if(sortBy==="roi") return b.roiNum - a.roiNum;
    if(sortBy==="winrate") return b.winRate - a.winRate;
    if(sortBy==="picks") return b.picks - a.picks;
    return 0;
  });

  return (
    <div style={{paddingTop:80,minHeight:"100vh",padding:"clamp(80px,12vw,100px) 5% 60px"}}>
      <div style={{maxWidth:700,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:32}}>
          <h1 style={{fontFamily:"'Bebas Neue'",fontSize:"clamp(2.5rem,6vw,4rem)",lineHeight:.95,marginBottom:12}}>
            Top <span style={{color:"var(--g)"}}>Tipsters</span>
          </h1>
          <p style={{color:"var(--muted)",fontSize:"0.88rem"}}>Rankings basados en resultados reales verificados</p>
        </div>
        <div style={{display:"flex",gap:8,justifyContent:"center",marginBottom:28}}>
          {[["roi","📊 ROI"],["winrate","🎯 Win Rate"],["picks","📈 Picks"]].map(([v,l])=>(
            <button key={v} onClick={()=>setSortBy(v)} style={{background:sortBy===v?"var(--g)":"var(--d3)",color:sortBy===v?"#000":"var(--muted)",border:"1px solid var(--border)",padding:"8px 16px",borderRadius:6,cursor:"pointer",fontSize:"0.78rem",fontWeight:700}}>
              {l}
            </button>
          ))}
        </div>
        {sorted.length === 0 ? (
          <div style={{textAlign:"center",padding:60,color:"var(--muted)"}}>
            <div style={{fontSize:"3rem",marginBottom:16}}>🏆</div>
            <div>No hay tipsters registrados aún</div>
          </div>
        ) : sorted.map((t,i)=>(
          <div key={t._id||i} style={{background:"var(--d3)",border:"1px solid var(--border)",borderRadius:12,padding:"20px",marginBottom:12,display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:12}}>
            <div style={{display:"flex",alignItems:"center",gap:16}}>
              <div style={{fontFamily:"'Bebas Neue'",fontSize:"1.8rem",color:"var(--gold)",width:32}}>{i+1}</div>
              <div style={{width:44,height:44,borderRadius:"50%",background:"var(--g)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Bebas Neue'",color:"#000",fontSize:"1.2rem",overflow:"hidden",flexShrink:0}}>
                {t.avatar ? <img src={t.avatar} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/> : (t.name||"T")[0].toUpperCase()}
              </div>
              <div>
                <div style={{fontWeight:700,fontSize:"1rem"}}>{t.name}</div>
                <div style={{fontSize:"0.72rem",color:"var(--muted)"}}>{t.picks} picks · Win Rate {t.winRate}%</div>
              </div>
            </div>
            <div style={{textAlign:"right"}}>
              <div style={{fontFamily:"'Bebas Neue'",fontSize:"1.8rem",color:"var(--g)"}}>{t.roi||"+0%"}</div>
              <div style={{fontSize:"0.65rem",color:"var(--muted)",letterSpacing:1}}>ROI</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── AUTH VIEW ─────────────────────────────────────────────────────────────────
function AuthView({ setView, setUser, mode }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    setLoading(true); setError("");
    try {
      const endpoint = mode==="login" ? "/api/auth/login" : "/api/auth/register";
      const body = mode==="login" ? {email,password} : {name,email,password};
      const r = await fetch(BACKEND_URL+endpoint, {method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(body)});
      const data = await r.json();
      if (!r.ok) { setError(data.error||"Error"); setLoading(false); return; }
      localStorage.setItem("tpz_token", data.token);
      setUser(data.user);
      setView("home");
    } catch(e) { setError("Error de conexión"); setLoading(false); }
  }

  const iStyle = {width:"100%",background:"var(--d4)",border:"1px solid var(--border)",borderRadius:8,padding:"12px 14px",color:"var(--text)",fontSize:"0.95rem",outline:"none",marginBottom:12,boxSizing:"border-box"};

  return (
    <div style={{paddingTop:80,minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:"clamp(80px,12vw,100px) 5% 60px"}}>
      <div style={{maxWidth:420,width:"100%",animation:"popIn .4s ease"}}>
        <div style={{background:"var(--d2)",border:"1px solid var(--border)",borderRadius:16,padding:32}}>
          <h2 style={{fontFamily:"'Bebas Neue'",fontSize:"2rem",marginBottom:24,textAlign:"center"}}>
            {mode==="login"?"Iniciar Sesión":"Crear Cuenta"}
          </h2>
          {mode==="register" && <input value={name} onChange={e=>setName(e.target.value)} placeholder="Nombre completo" style={iStyle}/>}
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" type="email" style={iStyle}/>
          <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Contraseña" type="password" style={iStyle}/>
          {error && <div style={{color:"#f44336",fontSize:"0.82rem",marginBottom:12}}>{error}</div>}
          <button onClick={handleSubmit} disabled={loading} style={{width:"100%",background:"var(--g)",color:"#000",border:"none",padding:"13px",borderRadius:8,fontFamily:"'Barlow Condensed'",fontSize:"1rem",fontWeight:900,letterSpacing:2,cursor:"pointer",marginBottom:16}}>
            {loading?"...":mode==="login"?"ENTRAR":"CREAR CUENTA"}
          </button>
          <div style={{textAlign:"center",fontSize:"0.82rem",color:"var(--muted)"}}>
            {mode==="login" ? (
              <span>¿No tienes cuenta? <button onClick={()=>setView("register")} style={{background:"none",border:"none",color:"var(--g)",cursor:"pointer",fontWeight:700}}>Regístrate</button></span>
            ) : (
              <span>¿Ya tienes cuenta? <button onClick={()=>setView("login")} style={{background:"none",border:"none",color:"var(--g)",cursor:"pointer",fontWeight:700}}>Inicia sesión</button></span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── PROFILE VIEW ──────────────────────────────────────────────────────────────
function ProfileView({ setView, user, setUser }) {
  const [name, setName] = useState(user?.name||"");
  const [bio, setBio] = useState(user?.bio||"");
  const [paypal, setPaypal] = useState(user?.paypal||"");
  const [avatar, setAvatar] = useState(user?.avatar||null);
  const [editMode, setEditMode] = useState(false);
  const [saved, setSaved] = useState(false);

  async function handleSave() {
    try {
      const token = localStorage.getItem("tpz_token");
      const r = await fetch(BACKEND_URL+"/api/auth/profile",{method:"PUT",headers:{"Content-Type":"application/json","Authorization":"Bearer "+token},body:JSON.stringify({name,bio,paypal,avatar})});
      if(r.ok){const updated=await r.json();setUser(prev=>({...prev,...updated,name,bio,paypal,avatar}));}
      else{setUser(prev=>({...prev,name,bio,paypal,avatar}));}
    }catch(e){setUser(prev=>({...prev,name,bio,paypal,avatar}));}
    setSaved(true); setEditMode(false); setTimeout(()=>setSaved(false),2000);
  }

  return (
    <div style={{paddingTop:80,minHeight:"100vh",padding:"clamp(80px,12vw,100px) 5% 60px"}}>
      <div style={{maxWidth:600,margin:"0 auto"}}>
        <div style={{background:"var(--d2)",border:"1px solid var(--border)",borderRadius:16,padding:24,marginBottom:20,position:"relative"}}>
          <button onClick={()=>setEditMode(!editMode)} style={{position:"absolute",top:16,right:16,background:"var(--d4)",border:"1px solid var(--border)",color:"var(--muted)",padding:"6px 14px",borderRadius:6,cursor:"pointer",fontSize:"0.75rem"}}>
            {editMode?"Cancelar":"✏️ Editar"}
          </button>
          <div style={{display:"flex",alignItems:"center",gap:20,flexWrap:"wrap"}}>
            <div style={{width:80,height:80,borderRadius:"50%",background:"var(--d4)",border:"3px solid var(--g)",display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden",flexShrink:0}}>
              {avatar?<img src={avatar} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>:<span style={{fontFamily:"'Bebas Neue'",fontSize:"2rem",color:"var(--g)"}}>{(user?.name||"U")[0].toUpperCase()}</span>}
            </div>
            <div style={{flex:1}}>
              {editMode?(
                <>
                  <input value={name} onChange={e=>setName(e.target.value)} placeholder="Nombre" style={{width:"100%",background:"var(--d4)",border:"1px solid var(--border)",borderRadius:6,padding:"8px 10px",color:"var(--text)",fontSize:"1rem",fontWeight:700,outline:"none",marginBottom:6,boxSizing:"border-box"}}/>
                  <textarea value={bio} onChange={e=>setBio(e.target.value)} placeholder="Bio" style={{width:"100%",background:"var(--d4)",border:"1px solid var(--border)",borderRadius:6,padding:"6px 10px",color:"var(--muted)",fontSize:"0.82rem",outline:"none",resize:"none",height:60,boxSizing:"border-box"}}/>
                  <input value={paypal} onChange={e=>setPaypal(e.target.value)} placeholder="Email PayPal" style={{width:"100%",background:"var(--d4)",border:"1px solid var(--border)",borderRadius:6,padding:"6px 10px",color:"var(--muted)",fontSize:"0.82rem",outline:"none",marginTop:6,boxSizing:"border-box"}}/>
                </>
              ):(
                <>
                  <h2 style={{fontSize:"1.4rem",fontWeight:700,marginBottom:4}}>{user?.name}</h2>
                  <div style={{fontSize:"0.82rem",color:"var(--muted)",marginBottom:4}}>{user?.email}</div>
                  {user?.bio&&<div style={{fontSize:"0.8rem",color:"var(--text)"}}>{user.bio}</div>}
                </>
              )}
            </div>
          </div>
          {editMode&&(
            <button onClick={handleSave} style={{marginTop:16,width:"100%",background:"var(--g)",color:"#000",border:"none",padding:"12px",borderRadius:8,fontFamily:"'Barlow Condensed'",fontSize:"1rem",fontWeight:900,letterSpacing:2,cursor:"pointer"}}>
              GUARDAR CAMBIOS
            </button>
          )}
          {saved&&<div style={{marginTop:12,textAlign:"center",color:"var(--g)",fontSize:"0.82rem"}}>✅ Guardado</div>}
        </div>
        <div style={{background:"var(--d3)",border:"1px solid var(--border)",borderRadius:12,padding:16,textAlign:"center"}}>
          <div style={{fontSize:"0.65rem",color:"var(--muted)",letterSpacing:1.5,marginBottom:8}}>MEMBRESÍA</div>
          <span style={{background:user?.role==="pro"?"rgba(29,185,84,0.15)":user?.role==="admin"?"rgba(245,197,66,0.15)":"rgba(107,128,120,0.15)",color:user?.role==="pro"?"var(--g)":user?.role==="admin"?"var(--gold)":"var(--muted)",padding:"4px 16px",borderRadius:100,fontSize:"0.75rem",fontWeight:900,letterSpacing:2}}>
            {user?.role==="pro"?"PRO ⭐":user?.role==="admin"?"ADMIN 👑":"BÁSICO"}
          </span>
          {user?.role==="basic"&&(
            <div style={{marginTop:16}}>
              <button onClick={()=>setView("become-pro")} style={{background:"var(--g)",color:"#000",border:"none",padding:"10px 24px",borderRadius:6,fontFamily:"'Barlow Condensed'",fontSize:"0.9rem",fontWeight:900,letterSpacing:2,cursor:"pointer"}}>
                UPGRADE A PRO
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── BECOME PRO ────────────────────────────────────────────────────────────────
function BecomeProView({ setView, user, setUser }) {
  const [loading, setLoading] = useState(false);

  async function handlePayPal() {
    setLoading(true);
    try {
      const token = localStorage.getItem("tpz_token");
      const r = await fetch(BACKEND_URL+"/api/paypal/create-order",{method:"POST",headers:{"Content-Type":"application/json","Authorization":"Bearer "+token},body:JSON.stringify({amount:"29.99",description:"ThePickZone Pro 30 días"})});
      const data = await r.json();
      if (!r.ok){setLoading(false);return;}
      const orderId = data.orderId;
      const win = window.open("https://www.paypal.com/checkoutnow?token="+orderId,"_blank","width=500,height=600");
      const interval = setInterval(async()=>{
        try{
          const cr=await fetch(BACKEND_URL+"/api/paypal/capture-order",{method:"POST",headers:{"Content-Type":"application/json","Authorization":"Bearer "+token},body:JSON.stringify({orderId})});
          if(cr.ok){clearInterval(interval);if(win)win.close();const me=await fetch(BACKEND_URL+"/api/auth/me",{headers:{"Authorization":"Bearer "+token}});const u=await me.json();setUser(u);setView("profile");setLoading(false);}
        }catch(e){}
      },3000);
      setTimeout(()=>{clearInterval(interval);setLoading(false);},120000);
    }catch(e){setLoading(false);}
  }

  return (
    <div style={{paddingTop:80,minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:"clamp(80px,12vw,100px) 5% 60px"}}>
      <div style={{maxWidth:480,width:"100%",textAlign:"center",animation:"popIn .4s ease"}}>
        <div style={{fontFamily:"'Bebas Neue'",fontSize:"3rem",color:"var(--g)",marginBottom:8}}>Hazte PRO</div>
        <p style={{color:"var(--muted)",marginBottom:32,lineHeight:1.7}}>Accede a picks exclusivos y publica tus propios análisis</p>
        <div style={{background:"var(--d2)",border:"1px solid rgba(29,185,84,0.3)",borderRadius:16,padding:28,marginBottom:24}}>
          <div style={{fontFamily:"'Bebas Neue'",fontSize:"2.5rem",color:"var(--g)"}}>$29.99<span style={{fontSize:"1rem",color:"var(--muted)"}}>/mes</span></div>
          {["✅ Publica hasta 3 picks/día","✅ Acceso a todos los picks","✅ Panel de estadísticas","✅ Soporte prioritario"].map(b=>(
            <div key={b} style={{fontSize:"0.85rem",color:"var(--text)",padding:"6px 0",borderBottom:"1px solid var(--border)",textAlign:"left"}}>{b}</div>
          ))}
        </div>
        <button onClick={handlePayPal} disabled={loading} style={{width:"100%",background:"var(--g)",color:"#000",border:"none",padding:"16px",borderRadius:10,fontFamily:"'Barlow Condensed'",fontSize:"1.1rem",fontWeight:900,letterSpacing:2,cursor:"pointer"}}>
          {loading?"Procesando...":"PAGAR CON PAYPAL - $29.99"}
        </button>
        <button onClick={()=>setView("profile")} style={{background:"none",border:"none",color:"var(--muted)",fontSize:"0.8rem",cursor:"pointer",marginTop:16}}>← Volver</button>
      </div>
    </div>
  );
}

// ── PRO PANEL ─────────────────────────────────────────────────────────────────
function ProPanelView({ user, addPick, setView, picks }) {
  const [screen, setScreen] = useState("dashboard");
  const [league, setLeague] = useState(null);
  const [match, setMatch] = useState(null);
  const [odds, setOdds] = useState("2.50");
  const [bank, setBank] = useState("10");
  const [price, setPrice] = useState("10");
  const [imgSrc, setImgSrc] = useState(null);
  const [publishing, setPublishing] = useState(false);
  const [leagueSearch, setLeagueSearch] = useState("");
  const [liveMatches, setLiveMatches] = useState(null);
  const [loadingMatches, setLoadingMatches] = useState(false);

  const myPicks = picks.filter(p=>p.tipster===user?.name);
  const wonPicks = myPicks.filter(p=>p.result==="won");
  const lostPicks = myPicks.filter(p=>p.result==="lost");
  const winRate = wonPicks.length+lostPicks.length > 0 ? Math.round((wonPicks.length/(wonPicks.length+lostPicks.length))*100) : 0;

  const todayKey = "tpz_picks_today_"+new Date().toDateString();
  const todayCount = parseInt(localStorage.getItem(todayKey)||"0");
  const remaining = Math.max(0, 3-todayCount);

  async function fetchMatches(leagueObj) {
    setLoadingMatches(true); setLiveMatches(null);
    try {
      const r = await fetch(BACKEND_URL+"/api/fixtures/odds?league="+encodeURIComponent(leagueObj.name));
      if(r.ok){
        const data = await r.json();
        if(Array.isArray(data)&&data.length>0){
          const matches = data.map(m=>({id:m.id,home:m.home,away:m.away,time:isoToLocal(m.time)})).filter(m=>!isMatchStarted(m.time));
          setLiveMatches(matches);
          setLoadingMatches(false);
          return;
        }
      }
    }catch(e){}
    setLiveMatches([]);
    setLoadingMatches(false);
  }

  useEffect(()=>{
    if(screen==="step2"&&league&&liveMatches===null&&!loadingMatches) fetchMatches(league);
  },[screen,league]);

  async function doPublish() {
    if(remaining<=0){alert("Has alcanzado el límite de 3 picks por día");return;}
    setPublishing(true);
    try {
      const token = localStorage.getItem("tpz_token");
      const newPick = {
        tipster: user?.name||"Tipster",
        tipsterId: user?._id||user?.id,
        roi: user?.roi||"+0%",
        verified: true,
        league: league?.name||"Liga",
        sport: league?.sport||"",
        flag: league?.flag||"",
        match: match?(match.home+" vs "+match.away):"Partido",
        time: match?.time||"Hoy",
        odds: parseFloat(odds)||1.90,
        bank: parseInt(bank)||10,
        price: parseInt(price)||10,
        ticketImg: imgSrc||null,
      };
      const r = await fetch(BACKEND_URL+"/api/picks",{method:"POST",headers:{"Content-Type":"application/json","Authorization":"Bearer "+token},body:JSON.stringify(newPick)});
      const saved = await r.json();
      if(!r.ok){alert(saved.error||"Error publicando pick");setPublishing(false);return;}
      if(addPick) addPick({...newPick,...saved,id:saved._id});
      localStorage.setItem(todayKey, String(todayCount+1));
      setPublishing(false);
      setScreen("published");
    }catch(e){alert("Error de conexión al publicar");setPublishing(false);}
  }

  const filteredLeagues = leagueSearch.length>=2 ? ALL_LEAGUES.filter(l=>l.name.toLowerCase().includes(leagueSearch.toLowerCase())||l.country.toLowerCase().includes(leagueSearch.toLowerCase())).slice(0,20) : [];

  if(screen==="dashboard") return (
    <div style={{paddingTop:80,minHeight:"100vh",padding:"clamp(80px,12vw,100px) 5% 60px"}}>
      <div style={{maxWidth:700,margin:"0 auto"}}>
        <div style={{marginBottom:28}}>
          <div style={{fontSize:"0.68rem",color:"var(--g)",letterSpacing:3,textTransform:"uppercase",fontWeight:700,marginBottom:8}}>Panel Pro</div>
          <h1 style={{fontFamily:"'Bebas Neue'",fontSize:"clamp(2rem,5vw,3rem)"}}>Bienvenido, <span style={{color:"var(--g)"}}>{user?.name}</span></h1>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))",gap:12,marginBottom:28}}>
          {[["📊",user?.roi||"+0%","ROI"],["🎯",winRate+"%","Win Rate"],["📈",myPicks.length,"Picks totales"],["🎟️",remaining+"/3","Picks hoy"]].map(([ic,v,l])=>(
            <div key={l} style={{background:"var(--d3)",border:"1px solid var(--border)",borderRadius:10,padding:"18px 16px",textAlign:"center"}}>
              <div style={{fontSize:"1.4rem",marginBottom:6}}>{ic}</div>
              <div style={{fontFamily:"'Bebas Neue'",fontSize:"1.8rem",color:"var(--g)",lineHeight:1}}>{v}</div>
              <div style={{fontSize:"0.65rem",color:"var(--muted)",letterSpacing:1,marginTop:4}}>{l}</div>
            </div>
          ))}
        </div>
        <button onClick={()=>setScreen("step1")} disabled={remaining<=0} style={{background:remaining<=0?"var(--d4)":"var(--g)",color:remaining<=0?"var(--muted)":"#000",border:"none",padding:"16px 36px",borderRadius:8,fontFamily:"'Barlow Condensed'",fontSize:"1.1rem",fontWeight:900,letterSpacing:2,cursor:remaining<=0?"not-allowed":"pointer"}}>
          {remaining<=0?"LÍMITE ALCANZADO HOY":"+ SUBIR NUEVO PICK"}
        </button>
      </div>
    </div>
  );

  if(screen==="step1") return (
    <div style={{paddingTop:80,padding:"clamp(80px,12vw,100px) 5% 60px"}}>
      <div style={{maxWidth:600,margin:"0 auto"}}>
        <button onClick={()=>setScreen("dashboard")} style={{background:"none",border:"none",color:"var(--g)",cursor:"pointer",fontSize:"0.85rem",marginBottom:20}}>← Volver</button>
        <div style={{fontSize:"0.68rem",color:"var(--g)",letterSpacing:3,textTransform:"uppercase",fontWeight:700,marginBottom:8}}>Paso 1 de 3</div>
        <h2 style={{fontFamily:"'Bebas Neue'",fontSize:"2.5rem",marginBottom:24}}>Selecciona la liga</h2>
        <div style={{background:"var(--d3)",borderRadius:12,padding:"12px 16px",border:"2px solid var(--g)",marginBottom:16,display:"flex",alignItems:"center",gap:10}}>
          <span style={{fontSize:"1.2rem"}}>🔍</span>
          <input type="text" value={leagueSearch} onChange={e=>setLeagueSearch(e.target.value)} placeholder="Buscar liga o país..." style={{flex:1,background:"none",border:"none",outline:"none",color:"var(--text)",fontSize:"1rem"}}/>
        </div>
        {filteredLeagues.length>0 ? (
          <div style={{background:"var(--d3)",borderRadius:12,overflow:"hidden",border:"1px solid var(--border)"}}>
            {filteredLeagues.map((l,i)=>(
              <button key={i} onClick={()=>{setLeague(l);setLiveMatches(null);setScreen("step2");}} style={{width:"100%",background:"none",border:"none",borderBottom:"1px solid var(--border)",padding:"12px 16px",cursor:"pointer",textAlign:"left",display:"flex",alignItems:"center",justifyContent:"space-between"}}
                onMouseEnter={e=>e.currentTarget.style.background="rgba(29,185,84,0.06)"}
                onMouseLeave={e=>e.currentTarget.style.background="none"}>
                <div style={{color:"var(--text)",fontWeight:600}}>{l.flag} {l.name}</div>
                <div style={{fontSize:"0.68rem",color:"var(--muted)"}}>{l.sport} · {l.country}</div>
              </button>
            ))}
          </div>
        ) : leagueSearch.length<2 ? (
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(140px,1fr))",gap:8}}>
            {ALL_LEAGUES.slice(0,12).map((l,i)=>(
              <button key={i} onClick={()=>{setLeague(l);setLiveMatches(null);setScreen("step2");}} style={{background:"var(--d3)",border:"1px solid var(--border)",borderRadius:10,padding:"14px 10px",cursor:"pointer",textAlign:"center",transition:"all .2s"}}
                onMouseEnter={e=>{e.currentTarget.style.borderColor="var(--g)";e.currentTarget.style.background="rgba(29,185,84,0.06)";}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor="var(--border)";e.currentTarget.style.background="var(--d3)";}}>
                <div style={{fontSize:"1.4rem",marginBottom:4}}>{l.flag}</div>
                <div style={{fontSize:"0.75rem",color:"var(--text)",fontWeight:600}}>{l.name}</div>
                <div style={{fontSize:"0.62rem",color:"var(--muted)"}}>{l.sport}</div>
              </button>
            ))}
          </div>
        ) : (
          <div style={{textAlign:"center",color:"var(--muted)",padding:20}}>Sin resultados para "{leagueSearch}"</div>
        )}
      </div>
    </div>
  );

  if(screen==="step2") return (
    <div style={{paddingTop:80,padding:"clamp(80px,12vw,100px) 5% 60px"}}>
      <div style={{maxWidth:600,margin:"0 auto"}}>
        <button onClick={()=>setScreen("step1")} style={{background:"none",border:"none",color:"var(--g)",cursor:"pointer",fontSize:"0.85rem",marginBottom:20}}>← Cambiar liga</button>
        <div style={{fontSize:"0.68rem",color:"var(--g)",letterSpacing:3,textTransform:"uppercase",fontWeight:700,marginBottom:8}}>Paso 2 de 3</div>
        <h2 style={{fontFamily:"'Bebas Neue'",fontSize:"2.5rem",marginBottom:8}}>Selecciona el partido</h2>
        <div style={{marginBottom:16,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <span style={{background:"var(--d4)",borderRadius:6,padding:"4px 12px",fontSize:"0.78rem",color:"var(--text)",fontWeight:600}}>{league?.flag} {league?.name}</span>
          <button onClick={()=>fetchMatches(league)} disabled={loadingMatches} style={{background:"none",border:"1px solid var(--g)",color:"var(--g)",borderRadius:6,padding:"4px 12px",fontSize:"0.72rem",cursor:"pointer",fontWeight:700}}>
            {loadingMatches?"Cargando...":"🔄 Actualizar"}
          </button>
        </div>
        {loadingMatches ? (
          <div style={{textAlign:"center",padding:40,color:"var(--muted)"}}>Cargando partidos...</div>
        ) : liveMatches && liveMatches.length>0 ? (
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            {liveMatches.map((m,i)=>(
              <button key={i} onClick={()=>{setMatch(m);setScreen("step3");}} style={{background:"var(--d3)",border:"1px solid var(--border)",borderRadius:10,padding:"16px",cursor:"pointer",textAlign:"left",transition:"all .2s",display:"flex",justifyContent:"space-between",alignItems:"center"}}
                onMouseEnter={e=>{e.currentTarget.style.borderColor="var(--g)";e.currentTarget.style.background="rgba(29,185,84,0.06)";}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor="var(--border)";e.currentTarget.style.background="var(--d3)";}}>
                <div>
                  <div style={{fontWeight:700,fontSize:"1rem",color:"var(--text)",marginBottom:4}}>{m.home} vs {m.away}</div>
                  <div style={{fontSize:"0.72rem",color:"var(--g)",fontWeight:600}}>{m.time}</div>
                </div>
                <span style={{color:"var(--muted)",fontSize:"1.2rem"}}>›</span>
              </button>
            ))}
          </div>
        ) : liveMatches !== null ? (
          <div style={{textAlign:"center",color:"var(--muted)",padding:40}}>
            <div style={{fontSize:"2rem",marginBottom:12}}>📭</div>
            <div>No hay partidos disponibles para esta liga</div>
          </div>
        ) : null}
      </div>
    </div>
  );

  if(screen==="step3") return (
    <div style={{paddingTop:80,padding:"clamp(80px,12vw,100px) 5% 60px"}}>
      <div style={{maxWidth:500,margin:"0 auto"}}>
        <button onClick={()=>setScreen("step2")} style={{background:"none",border:"none",color:"var(--g)",cursor:"pointer",fontSize:"0.85rem",marginBottom:20}}>← Cambiar partido</button>
        <div style={{fontSize:"0.68rem",color:"var(--g)",letterSpacing:3,textTransform:"uppercase",fontWeight:700,marginBottom:8}}>Paso 3 de 3</div>
        <h2 style={{fontFamily:"'Bebas Neue'",fontSize:"2.5rem",marginBottom:24}}>Configura tu pick</h2>
        <div style={{background:"var(--d3)",border:"1px solid var(--g)",borderRadius:12,padding:16,marginBottom:16}}>
          <div style={{fontWeight:700,fontSize:"1rem"}}>{match?.home} vs {match?.away}</div>
          <div style={{fontSize:"0.72rem",color:"var(--g)",marginTop:4}}>{league?.name} · {match?.time}</div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:16}}>
          {[["Momio",odds,setOdds,"decimal"],["Bank %",bank,setBank,"numeric"]].map(([label,val,setter,mode])=>(
            <div key={label} style={{background:"var(--d3)",border:"1px solid var(--border)",borderRadius:10,padding:"12px"}}>
              <div style={{fontSize:"0.68rem",color:"var(--muted)",letterSpacing:1,marginBottom:6}}>{label}</div>
              <input type="text" inputMode={mode} value={val} onChange={e=>setter(e.target.value)} style={{background:"none",border:"none",outline:"none",color:"var(--g)",fontSize:"1.4rem",fontWeight:700,width:"100%"}}/>
            </div>
          ))}
        </div>
        <div style={{background:"var(--d3)",border:"1px solid var(--border)",borderRadius:10,padding:"12px",marginBottom:16}}>
          <div style={{fontSize:"0.68rem",color:"var(--muted)",letterSpacing:1,marginBottom:10}}>PRECIO DEL PICK</div>
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            {[["FREE","0"],["$5","5"],["$10","10"],["$20","20"],["$50","50"],["$100","100"]].map(([label,val])=>(
              <button key={val} onClick={()=>setPrice(val)} style={{background:price===val?"var(--g)":"var(--d4)",color:price===val?"#000":"var(--text)",border:"1px solid",borderColor:price===val?"var(--g)":"var(--border)",borderRadius:8,padding:"8px 14px",cursor:"pointer",fontWeight:700,fontSize:"0.85rem",transition:"all .2s"}}>
                {label}
              </button>
            ))}
          </div>
        </div>
        <div style={{marginBottom:16}}>
          {imgSrc?(
            <div style={{position:"relative",borderRadius:8,overflow:"hidden",border:"2px solid var(--g)"}}>
              <img src={imgSrc} alt="Ticket" style={{width:"100%",display:"block",maxHeight:200,objectFit:"cover"}}/>
              <button onClick={()=>setImgSrc(null)} style={{position:"absolute",top:8,right:8,background:"rgba(0,0,0,0.7)",border:"none",color:"#fff",borderRadius:"50%",width:28,height:28,cursor:"pointer"}}>✕</button>
              <div style={{background:"rgba(29,185,84,0.9)",padding:"5px 10px",textAlign:"center"}}>
                <span style={{fontSize:"0.7rem",color:"#000",fontWeight:700}}>✓ Imagen cargada</span>
              </div>
            </div>
          ):(
            <label style={{display:"block",cursor:"pointer"}}>
              <input type="file" accept="image/*" style={{display:"none"}} onChange={e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=ev=>setImgSrc(ev.target.result);r.readAsDataURL(f);}}/>
              <div style={{background:"var(--d3)",borderRadius:8,padding:"28px 16px",border:"2px dashed var(--border)",textAlign:"center",transition:"all .2s"}}
                onMouseEnter={e=>e.currentTarget.style.borderColor="var(--g)"}
                onMouseLeave={e=>e.currentTarget.style.borderColor="var(--border)"}>
                <div style={{fontSize:"2rem",marginBottom:8}}>📷</div>
                <div style={{fontSize:"0.82rem",color:"var(--text)",fontWeight:600}}>Sube foto de tu ticket</div>
                <div style={{fontSize:"0.72rem",color:"var(--muted)",marginTop:4}}>Playdoit, DraftKings, FanDuel...</div>
              </div>
            </label>
          )}
        </div>
        <div style={{background:"rgba(29,185,84,0.05)",border:"1px solid rgba(29,185,84,0.15)",borderRadius:8,padding:"10px 14px",marginBottom:16,fontSize:"0.78rem",color:"var(--muted)"}}>
          🤖 <span style={{color:"var(--g)",fontWeight:700}}>IA verificará tu ticket</span> — Claude analizará el resultado automáticamente al terminar el partido
        </div>
        <button onClick={doPublish} disabled={publishing} style={{width:"100%",background:publishing?"var(--d4)":"var(--g)",color:publishing?"var(--muted)":"#000",border:"none",padding:"16px",borderRadius:8,fontFamily:"'Barlow Condensed'",fontSize:"1.1rem",fontWeight:900,letterSpacing:2,cursor:"pointer"}}>
          {publishing?"Publicando...":"✅ PUBLICAR PICK"}
        </button>
      </div>
    </div>
  );

  if(screen==="published") return (
    <div style={{paddingTop:80,minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:"clamp(80px,12vw,100px) 5% 60px",textAlign:"center"}}>
      <div style={{maxWidth:500,margin:"0 auto",animation:"popIn .5s ease"}}>
        <div style={{width:80,height:80,borderRadius:"50%",background:"rgba(29,185,84,0.15)",border:"2px solid var(--g)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 24px",fontSize:"2rem"}}>✅</div>
        <h2 style={{fontFamily:"'Bebas Neue'",fontSize:"3rem",color:"var(--g)",marginBottom:8}}>Pick Publicado!</h2>
        <p style={{color:"var(--muted)",marginBottom:32}}>{league?.name} · {match?.home} vs {match?.away}</p>
        <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
          <button onClick={()=>setView("marketplace")} style={{background:"var(--g)",color:"#000",border:"none",padding:"13px 28px",borderRadius:8,fontFamily:"'Barlow Condensed'",fontSize:"1rem",fontWeight:900,letterSpacing:2,cursor:"pointer"}}>VER EN MARKETPLACE</button>
          <button onClick={()=>{setScreen("dashboard");setLeague(null);setMatch(null);setOdds("2.50");setBank("10");setPrice("10");setImgSrc(null);setLiveMatches(null);}} style={{background:"var(--d3)",color:"var(--text)",border:"1px solid var(--border)",padding:"13px 28px",borderRadius:8,fontFamily:"'Barlow Condensed'",fontSize:"1rem",fontWeight:700,letterSpacing:2,cursor:"pointer"}}>SUBIR OTRO</button>
        </div>
      </div>
    </div>
  );

  return null;
}

// ── ADMIN PANEL ───────────────────────────────────────────────────────────────
function AdminPanel({ setView, user, picks }) {
  const [tab, setTab] = useState("results");
  const [adminUsers, setAdminUsers] = useState([]);
  const [pendingPicks, setPendingPicks] = useState([]);
  const [allPicks, setAllPicks] = useState([]);
  const [resetting, setResetting] = useState(false);

  const loadData = () => {
    const token = localStorage.getItem("tpz_token");
    const h = {"Authorization":"Bearer "+token};
    fetch(BACKEND_URL+"/api/admin/users",{headers:h}).then(r=>r.json()).then(d=>{if(Array.isArray(d))setAdminUsers(d);}).catch(()=>{});
    fetch(BACKEND_URL+"/api/admin/picks-pending",{headers:h}).then(r=>r.json()).then(d=>{if(Array.isArray(d))setPendingPicks(d);}).catch(()=>{});
    fetch(BACKEND_URL+"/api/admin/picks-all",{headers:h}).then(r=>r.json()).then(d=>{if(Array.isArray(d))setAllPicks(d);}).catch(()=>{});
  };

  useEffect(()=>{loadData();},[]);

  async function approveResult(pickId, result) {
    const token = localStorage.getItem("tpz_token");
    const r = await fetch(BACKEND_URL+"/api/picks/"+pickId+"/result",{method:"PUT",headers:{"Content-Type":"application/json","Authorization":"Bearer "+token},body:JSON.stringify({result})});
    if(r.ok){alert("Resultado: "+result.toUpperCase());setPendingPicks(prev=>prev.filter(p=>p._id!==pickId));loadData();}
    else alert("Error al guardar");
  }

  async function reanalyze(pickId) {
    const token = localStorage.getItem("tpz_token");
    const r = await fetch(BACKEND_URL+"/api/picks/"+pickId+"/analyze",{method:"POST",headers:{"Authorization":"Bearer "+token}});
    const data = await r.json();
    if(r.ok){alert("Dictamen: "+data.analysis?.resultado);loadData();}
    else alert("Error: "+data.error);
  }

  async function resetStats() {
    if(!window.confirm("¿Resetear todas las estadísticas?"))return;
    setResetting(true);
    const token = localStorage.getItem("tpz_token");
    await fetch(BACKEND_URL+"/api/admin/reset-stats",{method:"POST",headers:{"Authorization":"Bearer "+token}});
    setResetting(false); alert("Stats reseteados"); loadData();
  }

  const totalRevenue = allPicks.filter(p=>p.result!=="pending").reduce((s,p)=>s+(p.buyers?.length||0)*parseFloat(p.price||0),0);
  const tabStyle = t=>({background:tab===t?"var(--g)":"transparent",color:tab===t?"#000":"var(--muted)",border:"none",padding:"8px 18px",borderRadius:6,cursor:"pointer",fontSize:"0.78rem",fontWeight:700,letterSpacing:1,textTransform:"uppercase"});

  return (
    <div style={{paddingTop:80,minHeight:"100vh",padding:"clamp(80px,12vw,100px) 5% 60px"}}>
      <div style={{maxWidth:700,margin:"0 auto"}}>
        <div style={{marginBottom:28,display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:12}}>
          <div>
            <div style={{fontSize:"0.68rem",color:"var(--g)",letterSpacing:3,textTransform:"uppercase",fontWeight:700,marginBottom:8}}>Panel Administrador</div>
            <h1 style={{fontFamily:"'Bebas Neue'",fontSize:"clamp(2rem,5vw,3rem)"}}>Bienvenido, <span style={{color:"var(--g)"}}>Admin</span></h1>
          </div>
          <button onClick={()=>setView("revenue-dashboard")} style={{background:"rgba(29,185,84,0.1)",border:"1px solid rgba(29,185,84,0.3)",color:"var(--g)",padding:"10px 20px",borderRadius:8,cursor:"pointer",fontSize:"0.9rem",fontWeight:700}}>Revenue Dashboard</button>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",gap:12,marginBottom:24}}>
          {[["Usuarios",String(adminUsers.length||0)],["Picks totales",String(allPicks.length||0)],["Revenue","$"+totalRevenue.toFixed(0)],["Por aprobar",String(pendingPicks.length||0)]].map(([l,v])=>(
            <div key={l} style={{background:"var(--d3)",border:"1px solid var(--border)",borderRadius:10,padding:"16px 12px",textAlign:"center"}}>
              <div style={{fontFamily:"'Bebas Neue'",fontSize:"1.6rem",color:"var(--g)",lineHeight:1}}>{v}</div>
              <div style={{fontSize:"0.62rem",color:"var(--muted)",letterSpacing:1,marginTop:3}}>{l}</div>
            </div>
          ))}
        </div>
        <div style={{display:"flex",gap:8,marginBottom:20,flexWrap:"wrap"}}>
          {["results","history","payouts","users"].map(t=>(
            <button key={t} onClick={()=>setTab(t)} style={tabStyle(t)}>
              {t==="results"?"Resultados":t==="history"?"Historial":t==="payouts"?"Pagos":"Usuarios"}
            </button>
          ))}
        </div>

        {tab==="results"&&(
          <div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
              <div style={{fontSize:"0.82rem",color:"var(--muted)"}}>{pendingPicks.length} picks pendientes</div>
              <div style={{display:"flex",gap:8}}>
                <button onClick={async()=>{const token=localStorage.getItem("tpz_token");await fetch(BACKEND_URL+"/api/admin/analyze-picks",{method:"POST",headers:{"Authorization":"Bearer "+token}});alert("Análisis iniciado");}} style={{background:"rgba(29,185,84,0.15)",border:"1px solid var(--g)",color:"var(--g)",padding:"6px 14px",borderRadius:6,cursor:"pointer",fontSize:"0.75rem",fontWeight:700}}>Analizar</button>
                <button onClick={resetStats} disabled={resetting} style={{background:"rgba(244,67,54,0.15)",border:"1px solid #f44336",color:"#f44336",padding:"6px 14px",borderRadius:6,cursor:"pointer",fontSize:"0.75rem",fontWeight:700}}>{resetting?"...":"Reset Stats"}</button>
              </div>
            </div>
            {pendingPicks.length===0&&<div style={{textAlign:"center",color:"var(--muted)",padding:40}}>No hay picks pendientes</div>}
            {pendingPicks.map((p,i)=>(
              <div key={p._id||i} style={{background:"var(--d3)",border:"1px solid var(--border)",borderRadius:10,padding:16,marginBottom:10}}>
                <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:10}}>
                  {p.ticketImg&&<img src={p.ticketImg} alt="ticket" style={{width:100,height:70,objectFit:"cover",borderRadius:6,cursor:"pointer"}} onClick={()=>{const d=document.createElement("div");d.style.cssText="position:fixed;inset:0;background:rgba(0,0,0,0.9);z-index:9999;display:flex;align-items:center;justify-content:center;cursor:pointer";d.onclick=()=>document.body.removeChild(d);const img=document.createElement("img");img.src=p.ticketImg;img.style.cssText="max-width:90vw;max-height:90vh;object-fit:contain";d.appendChild(img);document.body.appendChild(d);}}/>}
                  <div style={{flex:1}}>
                    <div style={{fontWeight:700,fontSize:"0.9rem",marginBottom:4}}>{p.match}</div>
                    <div style={{fontSize:"0.72rem",color:"var(--muted)",marginBottom:4}}>{p.league} · {p.tipster} · Momio {p.odds}</div>
                    {p.aiAnalysis&&<div style={{fontSize:"0.72rem",color:"var(--g)",background:"rgba(29,185,84,0.1)",padding:"4px 8px",borderRadius:4}}>{p.aiAnalysis.resultado} ({p.aiAnalysis.confianza}%) - {p.aiAnalysis.detalle}</div>}
                  </div>
                </div>
                <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                  <button onClick={()=>approveResult(p._id,"won")} style={{background:"rgba(29,185,84,0.15)",border:"1px solid var(--g)",color:"var(--g)",padding:"8px 16px",borderRadius:6,cursor:"pointer",fontWeight:700,fontSize:"0.8rem"}}>GANADO</button>
                  <button onClick={()=>approveResult(p._id,"lost")} style={{background:"rgba(244,67,54,0.15)",border:"1px solid #f44336",color:"#f44336",padding:"8px 16px",borderRadius:6,cursor:"pointer",fontWeight:700,fontSize:"0.8rem"}}>PERDIDO</button>
                  <button onClick={()=>approveResult(p._id,"void")} style={{background:"rgba(245,197,66,0.15)",border:"1px solid var(--gold)",color:"var(--gold)",padding:"8px 16px",borderRadius:6,cursor:"pointer",fontWeight:700,fontSize:"0.8rem"}}>VOID</button>
                  <button onClick={()=>reanalyze(p._id)} style={{background:"rgba(100,100,255,0.15)",border:"1px solid #6464ff",color:"#6464ff",padding:"8px 16px",borderRadius:6,cursor:"pointer",fontWeight:700,fontSize:"0.8rem"}}>RE-ANALIZAR</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab==="history"&&(
          <div>
            <div style={{marginBottom:16,fontSize:"0.82rem",color:"var(--muted)"}}>{allPicks.filter(p=>p.result!=="pending").length} picks resueltos</div>
            {allPicks.filter(p=>p.result!=="pending").map((p,i)=>(
              <div key={p._id||i} style={{background:"var(--d3)",border:"1px solid var(--border)",borderRadius:10,padding:"14px 16px",marginBottom:8}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8}}>
                  <div>
                    <div style={{fontWeight:700,fontSize:"0.9rem"}}>{p.match}</div>
                    <div style={{fontSize:"0.72rem",color:"var(--muted)",marginTop:2}}>{p.league} · {p.tipster} · Momio {p.odds}</div>
                  </div>
                  <div style={{display:"flex",alignItems:"center",gap:8}}>
                    <span style={{padding:"4px 12px",borderRadius:6,fontSize:"0.75rem",fontWeight:700,background:p.result==="won"?"rgba(29,185,84,0.15)":p.result==="lost"?"rgba(244,67,54,0.15)":"rgba(245,197,66,0.15)",color:p.result==="won"?"var(--g)":p.result==="lost"?"#f44336":"var(--gold)"}}>
                      {p.result==="won"?"GANADO":p.result==="lost"?"PERDIDO":"VOID"}
                    </span>
                    <button onClick={async()=>{if(!window.confirm("¿Restablecer?"))return;const token=localStorage.getItem("tpz_token");const r=await fetch(BACKEND_URL+"/api/picks/"+p._id+"/result",{method:"PUT",headers:{"Content-Type":"application/json","Authorization":"Bearer "+token},body:JSON.stringify({result:"pending"})});if(r.ok){alert("Restablecido");loadData();}}} style={{background:"rgba(100,100,255,0.15)",border:"1px solid #6464ff",color:"#6464ff",padding:"4px 10px",borderRadius:6,cursor:"pointer",fontSize:"0.72rem",fontWeight:700}}>Restablecer</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab==="payouts"&&(
          <div>
            <div style={{background:"rgba(245,197,66,0.08)",border:"1px solid rgba(245,197,66,0.2)",borderRadius:10,padding:"14px 16px",marginBottom:16,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div>
                <div style={{fontSize:"0.72rem",color:"var(--gold)",fontWeight:700,marginBottom:2}}>CORTE SEMANAL</div>
                <div style={{fontSize:"0.82rem",color:"var(--text)"}}>Semana actual</div>
              </div>
              <div style={{textAlign:"right"}}>
                <div style={{fontFamily:"'Bebas Neue'",fontSize:"1.6rem",color:"var(--gold)"}}>${(totalRevenue*0.9).toFixed(2)}</div>
                <div style={{fontSize:"0.68rem",color:"var(--muted)"}}>Total por pagar (90%)</div>
              </div>
            </div>
            {adminUsers.filter(u=>u.role==="pro").length===0&&<div style={{textAlign:"center",color:"var(--muted)",padding:40}}>No hay tipsters Pro con ventas</div>}
            {adminUsers.filter(u=>u.role==="pro").map((u,i)=>{
              const uPicks = allPicks.filter(p=>String(p.tipsterId)===String(u._id));
              const sales = uPicks.reduce((s,p)=>s+(p.buyers?.length||0)*parseFloat(p.price||0),0);
              return (
                <div key={i} style={{background:"var(--d3)",border:"1px solid var(--border)",borderRadius:10,padding:16,marginBottom:10,display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:10}}>
                  <div>
                    <div style={{fontWeight:700,fontSize:"0.9rem"}}>{u.name}</div>
                    <div style={{fontSize:"0.72rem",color:"var(--muted)"}}>{u.email}</div>
                    <div style={{fontSize:"0.72rem",color:"var(--muted)"}}>{uPicks.length} picks</div>
                    {u.paypal&&<div style={{fontSize:"0.72rem",color:"var(--g)"}}>PayPal: {u.paypal}</div>}
                  </div>
                  <div style={{textAlign:"right"}}>
                    <div style={{fontFamily:"'Bebas Neue'",fontSize:"1.4rem",color:"var(--gold)"}}>${(sales*0.9).toFixed(2)}</div>
                    <div style={{fontSize:"0.65rem",color:"var(--muted)"}}>Plataforma: ${(sales*0.1).toFixed(2)}</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {tab==="users"&&(
          <div>
            {adminUsers.length===0&&<div style={{textAlign:"center",color:"var(--muted)",padding:40}}>No hay usuarios</div>}
            {adminUsers.map((u,i)=>(
              <div key={i} style={{background:"var(--d3)",border:"1px solid var(--border)",borderRadius:10,padding:"14px 16px",marginBottom:8,display:"flex",alignItems:"center",justifyContent:"space-between",gap:10,flexWrap:"wrap"}}>
                <div style={{display:"flex",alignItems:"center",gap:12}}>
                  <div style={{width:36,height:36,borderRadius:"50%",background:"var(--d4)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Bebas Neue'",color:"var(--g)",fontSize:"1rem"}}>{(u.name||"?")[0]}</div>
                  <div>
                    <div style={{fontWeight:700,fontSize:"0.9rem"}}>{u.name}</div>
                    <div style={{fontSize:"0.72rem",color:"var(--text-dim)"}}>{u.email} · {u.createdAt?new Date(u.createdAt).toLocaleDateString("es-MX"):""}</div>
                  </div>
                </div>
                <span style={{fontSize:"0.65rem",fontWeight:900,padding:"3px 10px",borderRadius:100,letterSpacing:1,background:u.role==="pro"?"rgba(29,185,84,0.15)":u.role==="admin"?"rgba(245,197,66,0.15)":"rgba(107,128,120,0.15)",color:u.role==="pro"?"var(--g)":u.role==="admin"?"var(--gold)":"var(--muted)"}}>
                  {u.role==="pro"?"PRO":u.role==="admin"?"ADMIN":"BÁSICO"}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── REVENUE DASHBOARD ─────────────────────────────────────────────────────────
function RevenueDashboard({ setView, picks }) {
  const [data, setData] = useState({totalRevenue:0,commission:0,buyers:0,tipsters:[],proUsers:0});
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const token = localStorage.getItem("tpz_token");
    const h = {"Authorization":"Bearer "+token};
    Promise.all([
      fetch(BACKEND_URL+"/api/admin/users",{headers:h}).then(r=>r.json()),
      fetch(BACKEND_URL+"/api/admin/picks-all",{headers:h}).then(r=>r.json()),
    ]).then(([users,allPicks])=>{
      const proUsers = Array.isArray(users)?users.filter(u=>u.role==="pro"):[];
      const resolved = Array.isArray(allPicks)?allPicks.filter(p=>p.result!=="pending"):[];
      const totalRevenue = resolved.reduce((s,p)=>s+(p.buyers?.length||0)*parseFloat(p.price||0),0);
      const totalBuyers = resolved.reduce((s,p)=>s+(p.buyers?.length||0),0);
      const tipsterData = proUsers.map(u=>{
        const uPicks = resolved.filter(p=>String(p.tipsterId)===String(u._id));
        const sales = uPicks.reduce((s,p)=>s+(p.buyers?.length||0)*parseFloat(p.price||0),0);
        return {name:u.name,roi:u.roi||"+0%",picks:uPicks.length,sales,commission:sales*0.1};
      });
      setData({totalRevenue,commission:totalRevenue*0.1,buyers:totalBuyers,tipsters:tipsterData,proUsers:proUsers.length});
      setLoading(false);
    }).catch(()=>setLoading(false));
  },[]);

  if(loading) return <div style={{paddingTop:120,textAlign:"center",color:"var(--muted)"}}>Cargando...</div>;

  return (
    <div style={{paddingTop:80,minHeight:"100vh",padding:"clamp(80px,12vw,100px) 5% 60px"}}>
      <div style={{maxWidth:700,margin:"0 auto"}}>
        <button onClick={()=>setView("admin-panel")} style={{background:"none",border:"none",color:"var(--g)",cursor:"pointer",fontSize:"0.85rem",marginBottom:20}}>← Volver al Admin</button>
        <h1 style={{fontFamily:"'Bebas Neue'",fontSize:"clamp(2rem,5vw,3rem)",marginBottom:24}}>Revenue & <span style={{color:"var(--g)"}}>Ganancias</span></h1>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",gap:12,marginBottom:24}}>
          {[["Revenue Total","$"+data.totalRevenue.toFixed(2)],["Mi Ganancia (10%)","$"+data.commission.toFixed(2)],["Compradores",String(data.buyers)],["Tipsters Pro",String(data.proUsers)]].map(([l,v])=>(
            <div key={l} style={{background:"var(--d3)",border:"1px solid var(--border)",borderRadius:10,padding:"16px 12px",textAlign:"center"}}>
              <div style={{fontFamily:"'Bebas Neue'",fontSize:"1.6rem",color:"var(--g)"}}>{v}</div>
              <div style={{fontSize:"0.62rem",color:"var(--muted)"}}>{l}</div>
            </div>
          ))}
        </div>
        <div style={{background:"var(--d3)",border:"1px solid var(--border)",borderRadius:10,padding:16}}>
          <div style={{fontSize:"0.72rem",color:"var(--g)",fontWeight:700,marginBottom:12,letterSpacing:2}}>TIPSTERS PRO</div>
          {data.tipsters.length===0&&<div style={{textAlign:"center",color:"var(--muted)",padding:20}}>Sin datos aún</div>}
          {data.tipsters.map((t,i)=>(
            <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 0",borderBottom:"1px solid var(--border)"}}>
              <div>
                <div style={{fontWeight:700,fontSize:"0.9rem"}}>{t.name}</div>
                <div style={{fontSize:"0.72rem",color:"var(--muted)"}}>{t.picks} picks · ROI {t.roi}</div>
              </div>
              <div style={{textAlign:"right"}}>
                <div style={{color:"var(--gold)",fontWeight:700,fontFamily:"'Bebas Neue'",fontSize:"1.2rem"}}>${t.sales.toFixed(2)}</div>
                <div style={{fontSize:"0.65rem",color:"var(--muted)"}}>Tu parte: ${t.commission.toFixed(2)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── APP ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [view, setView] = useState("home");
  const [user, setUser] = useState(null);
  const [picks, setPicks] = useState([]);
  const [purchaseTarget, setPurchaseTarget] = useState(null);
  const [notifications, setNotifications] = useState([]);

  // Restore session
  useEffect(()=>{
    const token = localStorage.getItem("tpz_token");
    if(token){
      fetch(BACKEND_URL+"/api/auth/me",{headers:{"Authorization":"Bearer "+token}})
        .then(r=>r.ok?r.json():null).then(d=>{if(d&&d._id)setUser(d);}).catch(()=>{});
    }
  },[]);

  // Load picks from backend
  useEffect(()=>{
    fetch(BACKEND_URL+"/api/picks")
      .then(r=>r.json())
      .then(data=>{if(Array.isArray(data))setPicks(data.map(p=>({...p,id:p._id||p.id})));})
      .catch(()=>{});
    const interval = setInterval(()=>{
      fetch(BACKEND_URL+"/api/picks").then(r=>r.json()).then(data=>{if(Array.isArray(data))setPicks(data.map(p=>({...p,id:p._id||p.id})));}).catch(()=>{});
    }, 60000);
    return ()=>clearInterval(interval);
  },[]);

  function addPick(p){ setPicks(prev=>[p,...prev]); }
  function gotoView(v){ setView(v); window.scrollTo({top:0,behavior:"smooth"}); }

  return (
    <>
      <style>{G}</style>
      <NavBar view={view} setView={gotoView} user={user} setUser={setUser} notifications={notifications} setNotifications={setNotifications}/>
      {view==="home"             && <HomeView        setView={gotoView} setPurchaseTarget={setPurchaseTarget} picks={picks}/>}
      {view==="marketplace"      && <MarketplaceView setView={gotoView} setPurchaseTarget={setPurchaseTarget} picks={picks}/>}
      {view==="purchase"         && <PurchaseView    pick={purchaseTarget} setView={gotoView} user={user}/>}
      {view==="rankings"         && <RankingsView    setView={gotoView} picks={picks}/>}
      {view==="login"            && <AuthView        setView={gotoView} setUser={setUser} mode="login"/>}
      {view==="register"         && <AuthView        setView={gotoView} setUser={setUser} mode="register"/>}
      {view==="profile"          && <ProfileView     setView={gotoView} user={user} setUser={setUser}/>}
      {view==="become-pro"       && <BecomeProView   setView={gotoView} user={user} setUser={setUser}/>}
      {view==="pro-panel"        && <ProPanelView    user={user} addPick={addPick} setView={gotoView} picks={picks}/>}
      {view==="admin-panel"      && <AdminPanel      setView={gotoView} user={user} picks={picks}/>}
      {view==="revenue-dashboard"&& <RevenueDashboard setView={gotoView} picks={picks}/>}
      <footer style={{background:"var(--dark)",borderTop:"1px solid var(--border)",padding:"40px 5%",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:20}}>
        <div style={{fontFamily:"'Bebas Neue'",fontSize:"1.2rem",letterSpacing:2,color:"var(--g)"}}>THE PICK ZONE</div>
        <div style={{display:"flex",gap:20}}>{["Términos","Privacidad","Soporte"].map(l=><a key={l} href="#" style={{color:"var(--muted)",fontSize:"0.8rem",textDecoration:"none"}}>{l}</a>)}</div>
        <span style={{fontSize:"0.75rem",color:"var(--muted)"}}>© 2026 The Pick Zone</span>
      </footer>
    </>
  );
}
